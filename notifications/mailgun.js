import Mailgun from "mailgun-js";
import schedule from "node-schedule-tz";
import moment from "moment";
import Activity from  "../models/activity";
import { groupBy } from "./arrayUtils";
import { renderTemplate } from "./emailTemplate";

const DEFAULT_TIMEZONE = "Etc/UTC";
const ACTIVITIES_INTERVAL = 15;
const ACTIVITIES_CHECK_START_HOUR = 5;
const ACTIVITIES_CHECK_END_HOUR = 20;
const WORK_WEEK_START_DAY = 1;
const WORK_WEEK_END_DAY = 5;
const DAILY_MAILING_HOUR = 2;
const DAILY_MAILING_MINUTE = 0;

let mailgunAPI = process.env.MAILGUN_API_KEY;
let mailgunDomain = process.env.MAILGUN_DOMAIN;
let mailgunFrom = process.env.MAILGUN_FROM;
let host = process.env.HOST || `http://localhost:${ process.env.PORT || 3000 }`;

export const getActivitiesForToday = () => {
  let today = moment.utc().startOf("day");
  let endOfCurrentDay = moment.utc(today).endOf("day");
  return Activity.find({
    date: {
      $gte: today.toDate(),
      $lt: endOfCurrentDay.toDate()
    },
    done: false,
  }).populate(Activity.populates.basic)
};

export const getNextActivities = () => {
  let currentTime = moment.utc();
  let endTime = moment.utc(currentTime).add(ACTIVITIES_INTERVAL, "minutes");
  return Activity.find({
    date: {
      $gte: currentTime.toDate(),
      $lt: endTime.toDate()
    },
    done: false,
  }).populate(Activity.populates.basic)
};


const mailCreator = (activities) => {
  let mailing = [];

  if(activities.length === 0) {
    return mailing;
  }

  let groupedEntries = groupBy(activities, activity => activity.assignedTo.email);

  groupedEntries.forEach(activities => {
    let user = "";
    let domainTimezone = "";
    activities.forEach(activity => {
      if(!user) {
        user = activity.assignedTo;
      }

      if(!domainTimezone) {
        domainTimezone = user.domain.timezone;
      }

      activity.time = moment(activity.date).tz(domainTimezone).format("HH:mm A");
    });

    mailing.push({
      address: user.email,
      html: renderTemplate({
        activities: activities,
        user: user,
        currentDate: moment().tz(domainTimezone).format("dddd, MMM Do, YYYY").toUpperCase(),
        host: host,
      }),
    });
  });

  return mailing;
};

const mailSender = (userEmail, subject, html) => {
  let mailgun = new Mailgun({
    apiKey: mailgunAPI,
    domain: mailgunDomain,
  });

  let mailData = {
    from: mailgunFrom,
    to: userEmail,
    subject: subject,
    html: html,
  };

  return mailgun.messages().send(mailData);
};

const dailyScheduler = job => {
  moment.tz.setDefault(DEFAULT_TIMEZONE);
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(WORK_WEEK_START_DAY, WORK_WEEK_END_DAY)];
  rule.hour = DAILY_MAILING_HOUR;
  rule.minute = DAILY_MAILING_MINUTE;

  schedule.scheduleJob(rule, job);
};

export const addDailyMailing = () => {
  dailyScheduler(() => {
    console.log("Daily mailing");
    getActivitiesForToday().then(activities => {
      let mails = mailCreator(activities);
      mails.forEach(email => {
        mailSender(email.address,"Activity reminder", email.html)
          .then(res => console.log(`[${email.address}] massage: ${res.message} id: ${res.id}`))
          .catch(err => console.error(`[${email.address}]error: ` + err))
      })
    }).catch(error => console.error("error: " + error))
  });
};

export const duringDayScheduler = job => {
  moment.tz.setDefault(DEFAULT_TIMEZONE);
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(WORK_WEEK_START_DAY, WORK_WEEK_END_DAY)];
  rule.hour = [new schedule.Range(ACTIVITIES_CHECK_START_HOUR, ACTIVITIES_CHECK_END_HOUR)];
  rule.minute = [new schedule.Range(0, 59, ACTIVITIES_INTERVAL)];

  schedule.scheduleJob(rule,job);
};

export const addDuringDayMailing = () => {
  duringDayScheduler(() => {
    console.log(`During day mailing: ${moment().utc().format("MMMM Do YYYY, h:mm:ss a")}`);
    getNextActivities().then(activities => {
      if(activities.length !== 0) {
        let mails = mailCreator(activities);
        mails.forEach(email => {
          mailSender(email.address,"Activity reminder", email.html)
            .then(res => console.log(`[${email.address}] massage: ${res.message} id: ${res.id}`))
            .catch(err => console.error(`[${email.address}] error: ` + err))
        })
      } else {
        console.log("No activities")
      }
    }).catch(error => console.error("error: " + error))
  })
};


export const runNotificationService = () => {
  if(mailgunAPI && mailgunDomain && mailgunFrom) {
    addDailyMailing();
    addDuringDayMailing();
    console.log("Notification service running")
  } else {
    console.log("Notification service disabled")
  }
};


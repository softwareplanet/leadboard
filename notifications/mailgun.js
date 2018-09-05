import Mailgun from "mailgun-js";
import schedule from "node-schedule";
import moment from "moment";
import Activity from  "../models/activity";
import { groupBy } from "./arrayUtils";
import { renderTemplate } from "./emailTemplate";

const activitiesInterval = 15;
const activitiesCheckStartHour = 9;
const activitiesCheckEndHour = 18;
const workWeekStartDay = 1;
const workWeekEndDay = 5;
const dailyMailingHour = 3;
const dailyMailingMinute = 0;

let mailgunAPI = process.env.MAILGUN_API_KEY;
let mailgunDomain = process.env.MAILGUN_DOMAIN;
let mailgunFrom = process.env.MAILGUN_FROM;
let host = process.env.HOST || `http://localhost: ${ process.env.PORT || 3000 }`;


const getActivitiesForToday = () => {
  console.log("Mail users");
  let today = moment.utc().startOf("day");
  let tomorrow = moment.utc(today).endOf("day");
  return Activity.find({
    date: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    },
    done: false,
  }).populate(Activity.populates.basic)
};

export const getNextActivities = () => {
  let currentTime = moment.utc();
  let endTime = moment.utc(currentTime).add(activitiesInterval, "minutes");
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
    activities.forEach(activity => {
      if(!user) {
        user = activity.assignedTo;
      }
    });

    mailing.push({
      user: user.email,
      email: renderTemplate({
        activities: activities,
        user: user,
        currentDate: moment().format("dddd MMM Do YYYY").toUpperCase(),
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
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(workWeekStartDay, workWeekEndDay)];
  rule.hour = dailyMailingHour;
  rule.minute = dailyMailingMinute;

  schedule.scheduleJob(rule, job);
};

export const setDailyMailing = () => {
  dailyScheduler(() => {
    getActivitiesForToday().then(activities => {
      let mails = mailCreator(activities);
      mails.forEach(email => {
        mailSender(email.user,"Activity reminder", email.email)
          .then(res => console.log(res))
          .catch(err => console.error("error: " + err))
      })
    }).catch(error => console.error("error: " + error))
  });
};

export const duringDayScheduler = job => {
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(workWeekStartDay, workWeekEndDay)];
  rule.hour = [new schedule.Range(activitiesCheckStartHour, activitiesCheckEndHour)];
  rule.minute = [new schedule.Range(0, 59, activitiesInterval)];

  schedule.scheduleJob(rule,job);
};

export const setDuringDayMailing = () => {
  duringDayScheduler(() => {
    console.log(moment());
    getNextActivities().then(activities => {
      if(activities.length !== 0) {
        let mails = mailCreator(activities);
        console.log(mails);
        mails.forEach(email => {
          mailSender(email.user,"Activity reminder", email.email)
            .then(res => console.log(res))
            .catch(err => console.error("error: " + err))
        })
      } else {
        console.log("No activities")
      }
    }).catch(error => console.error("error: " + error))
  })
};


export const runNotificationService = () => {
  if(mailgunAPI && mailgunDomain) {
    setDailyMailing();
    setDuringDayMailing();
    console.log("Notification service running")
  } else {
    console.log("Notification service disabled")
  }
};


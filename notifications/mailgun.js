import Mailgun from "mailgun-js";
import schedule from "node-schedule-tz";
import moment from "moment";
import Activity from "../models/activity";
import { groupBy } from "./arrayUtils";
import { renderTemplate } from "./emailTemplate";
import path from "path";

const defaultTimezone = "Etc/UTC";
const activitiesInterval = 15;
const activitiesCheckStartHour = 5;
const activitiesCheckStartHour = 20;
const workWeekStartDay = 1;
const workWeekEndDay = 5;
const dailyMailingHour = 2;
const dailyMailingMinute = 0;


let mailgunAPI = process.env.MAILGUN_API_KEY;
let mailgunDomain = process.env.MAILGUN_DOMAIN;
let mailgunFrom = process.env.MAILGUN_FROM;
let host = process.env.HOST || `http://localhost:${process.env.PORT || 3000}`;

export const getActivitiesForToday = () => {
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

const chooseIcons = (activities) => {
  let icons = [
    { type: "Call", icon: path.join(__dirname, "/emailTemplate/images/call.png") },
    { type: "Deadline", icon: path.join(__dirname, "/emailTemplate/images/deadline.png") },
    { type: "Email", icon: path.join(__dirname, "/emailTemplate/images/email.png") },
    { type: "Lunch", icon: path.join(__dirname, "/emailTemplate/images/lunch.png") },
    { type: "Meeting", icon: path.join(__dirname, "/emailTemplate/images/meeting.png") },
    { type: "Task", icon: path.join(__dirname, "/emailTemplate/images/task.png") },
  ];
  let result = []
  icons.map(iconObj =>
    activities.map(activity => { if (iconObj.type === activity.type) result.push(iconObj.icon) }))
  return [...new Set(result)];
}

const mailCreator = (activities) => {
  let mailing = [];

  if (activities.length === 0) {
    return mailing;
  }

  let groupedEntries = groupBy(activities, activity => activity.assignedTo.email);

  groupedEntries.forEach(activities => {
    let user = "";
    let domainTimezone = "";
    activities.forEach(activity => {
      if (!user) {
        user = activity.assignedTo;
      }

      if (!domainTimezone) {
        domainTimezone = user.domain.timezone;
      }

      activity.time = moment(activity.date).tz(domainTimezone).format("hh:mm A");
    });

    mailing.push({
      address: user.email,
      html: renderTemplate({
        activities: activities,
        user: user,
        currentDate: moment().tz(domainTimezone).format("dddd, MMM Do, YYYY").toUpperCase(),
        host: host,
      }),
      icons: chooseIcons(activities),
    });
  });

  return mailing;
};

const mailSender = (userEmail, subject, html, icons) => {

  let mailgun = new Mailgun({
    apiKey: mailgunAPI,
    domain: mailgunDomain,
  });

  let mailData = {
    from: mailgunFrom,
    to: userEmail,
    subject: subject,
    html: html,
    inline: icons,
  };
  return mailgun.messages().send(mailData);
};

const dailyScheduler = job => {
  moment.tz.setDefault(defaultTimezone);
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(workWeekStartDay, workWeekEndDay)];
  rule.hour = dailyMailingHour;
  rule.minute = dailyMailingMinute;

  schedule.scheduleJob(rule, job);
};

export const setDailyMailing = () => {
  dailyScheduler(() => {
    console.log("Daily mailing");
    getActivitiesForToday().then(activities => {
      let mails = mailCreator(activities);
      mails.forEach(email => {
        mailSender(email.address, "Activity reminder", email.html, email.icons)
          .then(res => console.log(`[${email.address}] massage: ${res.message} id: ${res.id}`))
          .catch(err => console.error(`[${email.address}]error: ` + err))
      })
    }).catch(error => console.error("error: " + error))
  });
};

export const duringDayScheduler = job => {
  moment.tz.setDefault(defaultTimezone);
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(workWeekStartDay, workWeekEndDay)];
  rule.hour = [new schedule.Range(activitiesCheckStartHour, activitiesCheckEndHour)];
  rule.minute = [new schedule.Range(0, 59, activitiesInterval)];

  schedule.scheduleJob(rule, job);
};

export const setDuringDayMailing = () => {
  duringDayScheduler(() => {
    console.log(`During day mailing: ${moment().utc().format("MMMM Do YYYY, h:mm:ss a")}`);
    getNextActivities().then(activities => {
      if (activities.length !== 0) {
        let mails = mailCreator(activities);
        mails.forEach(email => {
          mailSender(email.address, "Activity reminder", email.html, email.icons)
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
  if (mailgunAPI && mailgunDomain) {
    setDailyMailing();
    setDuringDayMailing();
    console.log("Notification service running")
  } else {
    console.log("Notification service disabled")
  }
};


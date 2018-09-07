import Mailgun from "mailgun-js";
import schedule from "node-schedule-tz";
import moment from "moment";
import Activity from "../models/activity";
import { groupBy } from "./arrayUtils";
import { renderTemplate } from "./emailTemplate";
import path from "path";

const DEFAULT_TIMEZONE = "Europe/Kiev";
const ACTIVITIES_INTERVAL = 15;
const ACTIVITIES_CHECK_START_HOUR = 7;
const ACTIVITIES_CHECK_END_HOUR = 20;
const WORK_WEEK_START_DAY = 1;
const WORK_WEEK_END_DAY = 5;
const DAILY_MAILING_HOUR = 7;
const DAILY_MAILING_MINUTE = 0;

const mailgunAPI = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const mailgunFrom = `postmaster@${mailgunDomain}`;
const baseURL = process.env.BASE_URL;

export const getActivitiesForToday = () => {
  let today = moment().startOf("day");
  let endOfCurrentDay = moment().endOf("day");
  return Activity.find({
    date: {
      $gte: today.toDate(),
      $lte: endOfCurrentDay.toDate()
    },
    done: false,
  }).populate(Activity.populates.basic)
    .sort({date: 1});
};

export const getNextActivities = () => {
  let currentTime = moment();
  let endTime = moment().add(ACTIVITIES_INTERVAL, "minutes");
  return Activity.find({
    date: {
      $gte: currentTime.toDate(),
      $lte: endTime.toDate()
    },
    done: false,
  }).populate(Activity.populates.basic)
    .sort({date: 1})
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
  let result = [];
  icons.map(iconObj =>
    activities.map(activity => { if (iconObj.type === activity.type) result.push(iconObj.icon) }));
  return [...new Set(result)];
};

const mailCreator = (activities, selector) => {
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
        host: baseURL,
        toggle: selector,
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
  moment.tz.setDefault(DEFAULT_TIMEZONE);
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(WORK_WEEK_START_DAY, WORK_WEEK_END_DAY)];
  rule.hour = DAILY_MAILING_HOUR;
  rule.minute = DAILY_MAILING_MINUTE;

  schedule.scheduleJob(rule, job);
};

export const addDailyMailing = () => {
  const distinction = "current";
  dailyScheduler(() => {
    console.log("Daily mailing");
    getActivitiesForToday().then(activities => {
      let mails = mailCreator(activities, distinction);
      mails.forEach(email => {
        mailSender(email.address, "Activities for today", email.html, email.icons)
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

  schedule.scheduleJob(rule, job);
};

export const addDuringDayMailing = () => {
  const distinction = "following";
  duringDayScheduler(() => {
    console.log(`During day mailing: ${moment().utc().format("MMMM Do YYYY, h:mm:ss a")}`);
    getNextActivities().then(activities => {
      if (activities.length !== 0) {
        let mails = mailCreator(activities, distinction);
        mails.forEach(email => {
          mailSender(email.address, "Following activities", email.html, email.icons)
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
  if (mailgunAPI && mailgunDomain && baseURL) {
    addDailyMailing();
    addDuringDayMailing();
    console.log("Notification service running");
    return;
  }

  console.warn("Mailing service not configured.\n" + 
  "To fix this issue you should specify MAILGUN_API_KEY, MAILGUN_DOMAIN, BASE_URL as environment variables.");

  if (process.env.NODE_ENV === "production") {
    throw new Error("Mailing configuration is required in production environment.");
  } 
  
};

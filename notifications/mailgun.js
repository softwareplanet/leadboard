import Mailgun from "mailgun-js";
import schedule from "node-schedule";
import moment from "moment";
import nunjucks from "nunjucks";
import Activity from  "../models/activity";
import { groupBy } from "./arrayUtils";
import { renderTemplate } from "./emailTemplate";

const activitiesInterval = 15;
const activitiesCheckStartHour = 9;
const activitiesCheckEndHour = 18;
const workWeekStartDay = 1;
const workWeekEndDay = 5;
const dailyMailingHour = 18;
const dailyMailingMinute = 36;

let mailgun_api = process.env.MAILGUN_API_KEY;
let mailgun_domain = process.env.MAILGUN_DOMAIN;
let mailgun_from = process.env.MAILGUN_FROM;

const getActivitiesForToday = () => {
  console.log("Mail users");
  let today = moment().startOf("day");
  let tomorrow = moment(today).endOf("day");
  return Activity.find({
    date: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }
  }).populate(Activity.populates.basic)
};

const getNextActivities = () => {
  let currentTime = moment();
  let endTime = moment(currentTime).add(activitiesInterval, "minutes");
  return Activity.find({
    date: {
      $gte: currentTime.toDate(),
      $lt: endTime.toDate()
    }
  }).populate(Activity.populates.basic)
};


const mailCreator = (activities) => {
  let mailing = [];

  let groupedEntries = groupBy(activities, activity => activity.assignedTo.email);

  groupedEntries.forEach(activities => {
    let email = renderTemplate({activities: activities, user: user, currentDate: moment().format("dddd, MMM Do, YYYY").toUpperCase() });
    let user = "";
    activities.forEach(activity => {
      if(!user) {
        user = activity.assignedTo;
      }
    });



    console.log(renderTemplate({activities: activities, user: user, currentDate: moment().format("dddd MMM Do YYYY").toUpperCase() }));
    mailing.push({
      user: user.email,
      email: email,
    });
  });

  return mailing;
};

const mailSender = (userEmail, subject, html) => {
  console.log("EEEEEEMMMMMMAAAAAAIIIILLLLLLL")
  console.log(userEmail)
  let mailgun = new Mailgun({
    apiKey: mailgun_api,
    domain: mailgun_domain,
  });

  let mailData = {
    from: mailgun_from,
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
      let mailing = mailCreator(activities);
      mailing.forEach(email => {
        mailSender(email.user,"Activity reminder", email.email)
          .then(res => console.log(res))
          .catch(err => console.log("error: " + err))
      })
    })
  });
};

export const duringDayScheduler = job => {
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(workWeekStartDay, workWeekEndDay)];
  rule.hour = [new schedule.Range(activitiesCheckStartHour, activitiesCheckEndHour)];
  rule.minute = [new schedule.Range(0, 60, 15)];

  schedule.scheduleJob(rule,job);

};

export const setDuringDayMailing = () => {
  duringDayScheduler(() => {
    console.log(moment());
    getNextActivities().then(activities => {
      if(activities.length !== 0) {
        console.log(mailCreator(activities))
      } else {
        console.log("No activities")
      }
    })
  })
};


export const runNotificationService = () => {
  if(mailgun_api && mailgun_domain) {
    setDailyMailing();
    setDuringDayMailing();
    console.log("Notification service running")
  } else {
    console.log("Notification service disabled")
  }
};


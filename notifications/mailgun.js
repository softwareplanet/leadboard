import Mailgun from "mailgun-js";
import schedule from "node-schedule";
import moment from "moment";
import nunjucks from "nunjucks";
import Activity from  "../models/activity";
import { groupBy } from "./arrayUtils";

let mailgun_api = process.env.MAILGUN_API_KEY;
let mailgun_domain = process.env.MAILGUN_DOMAIN;
let mailgun_from = process.env.MAILGUN_FROM;

export const mailActivities = () => {
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

export const mailCreator = (activities) => {
  let mailing = [];

  let groupedEntries = groupBy(activities, activity => activity.assignedTo.email);

  groupedEntries.forEach(activities => {
    let email = "";
    let user = "";
    activities.forEach(activity => {
      if(!email) {
        email = `Hi, ${activity.assignedTo.firstname} ` + "\n";
      }
      if(!user) {
        user = activity.assignedTo.email;
      }

      email += `${activity.subject}  ${activity.date} ` + "\n";
    });

    mailing.push({
      user: user,
      email: email.toString(),
    });
  });

  return mailing;
};

export const mailSender = (userEmail, subject, html) => {
  let mailgun = new Mailgun({
    apiKey: mailgun_api,
    domain: mailgun_domain,
  });

  let mailData = {
    from: "postmaster@sandbox61cca88a91e342549a80528c271fe147.mailgun.org",
    to: userEmail,
    subject: subject,
    html: html,
  };

  return mailgun.messages().send(mailData);
};

export const dailyScheduler = job => {
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 8;
  rule.minute = 0;
  schedule.scheduleJob(rule, job);
};

export const setDailyMailing = () => {
  dailyScheduler(() => {
    mailActivities().then(activities => {
      let mailing = mailCreator(activities);
      mailing.forEach(email => {
        mailSender(email.user,"Activity reminder", email.email)
          .then(res => console.log(res))
          .catch(err => console.log("error: " + err))
      })
    })
  });
};


export const runNotificationService = () => {
  if(mailgun_api && mailgun_domain) {
    setDailyMailing();
    console.log("Notification service running")
  } else {
    console.log("Notification service disabled")
  }
};


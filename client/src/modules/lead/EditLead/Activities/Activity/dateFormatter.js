import moment from "moment";

export const dateFormater = (date, hasStartTime) => {
  let unformatedTimestamp = new Date(date);
  let unformatedDate = new Date(unformatedTimestamp.toLocaleDateString());
  let currentDate = new Date(new Date().toLocaleDateString());

  if (currentDate.getTime() === unformatedDate.getTime()) {
    return todayFormat(hasStartTime, unformatedTimestamp);
  }

  let yesterday = getYesterday();
  if (yesterday.getTime() === unformatedDate.getTime()) {
    return yesterdayFormat(hasStartTime, unformatedTimestamp);
  }

  let tomorrow = getTomorrow();
  if (tomorrow.getTime() === unformatedDate.getTime()) {
    return tomorrowFormat(hasStartTime, unformatedTimestamp);
  }

  if (currentDate.getFullYear() === unformatedTimestamp.getFullYear()) {
    return thisYearFormat(hasStartTime, date);
  }

  return notThisYearFormat(unformatedTimestamp);
};

const yesterdayFormat = (hasStartTime, date) => {
  return hasStartTime ? `Yesterday at ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric"
  })} ` : `Yesterday`
};

const tomorrowFormat = (hasStartTime, date) => {
  return hasStartTime ? `Tomorrow at ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric"
  })} ` : `Tomorrow`
};

const thisYearFormat = (hasStartTime, date) => {
  return hasStartTime ? ` ${ moment(date).format("MMMM DD HH:mm A")}` : ` ${ moment(date).format("MMMM DD")}`;
};

const getYesterday = () => {
  let yesterday = new Date(new Date().toLocaleDateString());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const getTomorrow = () => {
  let tomorrow = new Date(new Date().toLocaleDateString());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const todayFormat = (hasStartTime, date) => {
  return hasStartTime ? `Today at  ${date.toLocaleString("en-US", {hour: "numeric", minute: "numeric"})}` : `Today`;
};

const notThisYearFormat = (date) => {
  return `${date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  })}`;
};

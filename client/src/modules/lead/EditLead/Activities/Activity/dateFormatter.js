export const dateFormater = (date, hasStartTime) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let unformatedTimestamp = new Date(date);
  let unformatedDate = new Date(unformatedTimestamp.toLocaleDateString());
  let currentDate = new Date(new Date().toLocaleDateString());

  let hours = unformatedTimestamp.getHours();
  let minutes = unformatedTimestamp.getMinutes();
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

  let month = months[unformatedTimestamp.getMonth() - 1];
  let day = unformatedTimestamp.getDate();
  if (currentDate.getFullYear() === unformatedTimestamp.getFullYear()) {
    return thisYearFormat(hasStartTime, month, day, hours, minutes);
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
  return hasStartTime ? `${date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  })} ` : ` ${ date.toLocaleString("en-US", {mounth: "long", day: "numeric"})}`;
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

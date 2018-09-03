import moment from "moment";

export const dateFormatter = (date, hasStartTime) => {
  let now = new Date();
  let activityDate = new Date(date);

  if (moment(now).isSame(activityDate, "day")) {
    return todayFormat(hasStartTime, activityDate);
  }

  let yesterday = getYesterday();
  if (moment(activityDate).isSame(yesterday, "day")) {
    return yesterdayFormat(hasStartTime, activityDate);
  }

  let tomorrow = getTomorrow();
  if (moment(activityDate).isSame(tomorrow, "day")) {
    return tomorrowFormat(hasStartTime, activityDate);
  }

  if (moment(now).isSame(activityDate, "year")) {
    return thisYearFormat(hasStartTime, activityDate);
  }

  return notThisYearFormat(hasStartTime, activityDate);
};

const yesterdayFormat = (hasStartTime, date) => {
  return hasStartTime ? `Yesterday at ${moment(date).format("hh:mm A")} ` : `Yesterday`;
};

const tomorrowFormat = (hasStartTime, date) => {
  return hasStartTime ? `Tomorrow at ${moment(date).format("hh:mm A")} ` : `Tomorrow`;
};

const thisYearFormat = (hasStartTime, date) => {
  return hasStartTime ? `${moment(date).format("MMMM DD hh:mm A")}` : ` ${ moment(date).format("MMMM DD")}`;
};

const todayFormat = (hasStartTime, date) => {
  return hasStartTime ? `Today at  ${moment(date).format("hh:mm A")}` : `Today`;
};

const notThisYearFormat = (hasStartTime, date) => {
  return hasStartTime ? `${moment(date).format("MMMM DD, YYYY hh:mm A")}` : `${moment(date).format("MMMM DD, YYYY")}`;
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

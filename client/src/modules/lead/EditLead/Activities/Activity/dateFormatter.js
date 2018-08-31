export const dateFormater = (date, hasStartTime) => {
  const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  let unformatedTimestamp = new Date(date);
  let unformatedDate = new Date(unformatedTimestamp.toLocaleDateString());
  let currentDate = new Date(new Date().toLocaleDateString());

  let hours = unformatedTimestamp.getHours();
  let minutes = unformatedTimestamp.getMinutes();
  if (currentDate.getTime() === unformatedDate.getTime()) {
    return todayFormat(hasStartTime, hours, minutes);
  }

  let yesterday = getYesterday();
  if (yesterday.getTime() === unformatedDate.getTime()) {
    return yesterdayFormat(hasStartTime, hours, minutes);
  }

  let tomorrow = getTomorrow();
  if (tomorrow.getTime() === unformatedDate.getTime()) {
    return tomorrowFormat(hasStartTime, hours, minutes);
  }

  let month = months[unformatedTimestamp.getMonth() - 1];
  let day = unformatedTimestamp.getDate();
  if (currentDate.getFullYear() === unformatedTimestamp.getFullYear()) {
    return thisYearFormat(hasStartTime, month, day, hours, minutes);
  }

  let weekDay = weekDays[unformatedTimestamp.getDay() - 1];
  if (currentDate.getTime()) {
    return thisYearFormat(hasStartTime, weekDay, hours, minutes);
  }
};

const yesterdayFormat = (hasStartTime, hours, minutes) => {
  return hasStartTime ? `Yesterday at ${hours}:${minutes} PM` : `Yesterday`
};

const tomorrowFormat = (hasStartTime, hours, minutes) => {
  return hasStartTime ? `Tomorrow at ${hours}:${minutes} PM` : `Tomorrow`
};

const thisYearFormat = (hasStartTime, month, day, hours, minutes) => {
  return hasStartTime ? `${month} ${day} ${hours}:${minutes} PM` : `${month} ${day}`;
};

const getYesterday = () =>{
  let yesterday =  new Date(new Date().toLocaleDateString());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const getTomorrow = () =>{
  let tomorrow =  new Date(new Date().toLocaleDateString());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const todayFormat = (hasStartTime, hours, minutes) => {
  return hasStartTime ? `Today at  ${hours}:${minutes}` : `Today`;
};
export const formatDate = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  let unformatedTimestamp = new Date(date);
  let unformatedDate = new Date(unformatedTimestamp.toLocaleDateString());
  let currentDate = new Date(new Date().toLocaleDateString());

  let hours = unformatedTimestamp.getHours();
  let minutes = unformatedTimestamp.getMinutes();
  if (currentDate.getTime() === unformatedDate.getTime()) {
    return todayFormat(hours, minutes);
  }

  let yesterday = getYesterday();
  if (yesterday.getTime() === unformatedDate.getTime()) {
    return yesterdayFormat(hours, minutes);
  }

  let month = monthNames[unformatedTimestamp.getMonth() - 1];
  let day = unformatedTimestamp.getDate();
  if (currentDate.getFullYear() === unformatedDate.getFullYear()) {
    return thisYearFormat(month, day, hours, minutes);
  }

  let year = unformatedTimestamp.getFullYear();
  return notThisYearFormat(month, day, hours, minutes, year);
};

const notThisYearFormat = (month, day, hours, minutes, year) => {
  return `${day} ${month} ${year} ${hours}:${minutes} PM`;
};

const yesterdayFormat = (hours, minutes) => {
  return `Yesterday at ${hours}:${minutes} PM`;
};

const thisYearFormat = (month, day, hours, minutes) => {
  return `${month} ${day} ${hours}:${minutes} PM`;
};

const todayFormat = (hours, minutes) => {
  return `Today at  ${hours}:${minutes} PM`;
};

const getYesterday = () =>{
  let yesterday =  new Date(new Date().toLocaleDateString());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

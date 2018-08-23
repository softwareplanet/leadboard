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
    return todayFormat(hours,minutes);
  }

  if (currentDate.getFullYear() === unformatedDate.getFullYear()) {
    let month = monthNames[unformatedTimestamp.getMonth() - 1];
    let day = unformatedDate.getDate();
    return thisYearFormat(month,day,hours,minutes)
  }

  return unformatedTimestamp.toDateString();
};

const thisYearFormat = (month,day,hours,minutes) =>{
  return `${month} ${day} ${hours}:${minutes} PM`;
};

const todayFormat = (hours,minutes) => {
   return `Today at  ${hours}:${minutes} PM`;
};

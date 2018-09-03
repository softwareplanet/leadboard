import moment from "moment";

export const dateFormatter = (date, hasStartTime) => {
  let activityDate = new Date(date);

  if (hasStartTime) {
    return moment(activityDate).calendar(null, {
      lastDay: "[Yesterday at] h:mm A",
      sameDay: "[Today at] h:mm A",
      nextDay: "[Tomorrow at] h:mm A",
      nextWeek: "dddd [at] h:mm A",
      lastWeek: "[Last] dddd D [at] h:mm A",
      sameElse: function (now) {
        if (this.isSame(now, "year")) {
          return "MMMM D h:mm A"
        }
        else return "MMMM D, YYYY hh:mm A"
      }
    });
  } else {
    return moment(activityDate).calendar(null, {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "MMMM D",
      nextWeek: "dddd",
      sameElse: function (now) {
        if (this.isSame(now, "year")) {
          return "MMMM D"
        }
        else return "MMMM D, YYYY"
      }
    });
  }
};

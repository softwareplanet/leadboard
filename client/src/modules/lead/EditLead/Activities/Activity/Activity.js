import React, { Component } from "react";
import styles from "./Activity.css";
import doneMark from "../../../../../assets/done-mark.svg"
import { dateFormater } from "./dateFormatter";
import { updateActivity } from "../activityActions";
import store from "../../../../../store.js";
import classNames from "classnames/bind";
import moment from "moment";

let cx = classNames.bind(styles);

class Activity extends Component {

  changeStatus = e => {
    e.preventDefault();
    let activity = { ...this.props.activity };
    activity.done = !activity.done;
    store.dispatch(updateActivity(activity));
  };

  checkTime = (date, hasStartTime, status) => {
    let activityDate = new Date(date);
    let now = new Date();

    if (status) {
      return styles.defaultTime;
    } else {
      if (moment(now).isSame(activityDate, "day")) {
        if (hasStartTime) {
          if (moment(now).isAfter(activityDate)) {
            return styles.expiredTime;
          } else return styles.defaultTime;
        }
        return styles.today;
      } if (moment(now).isAfter(activityDate)){
        return styles.expiredTime;
      } else return styles.defaultTime;
    }
  };

  render() {
    let { date, hasStartTime, done, subject } = this.props.activity;
    return (
      <div className={styles.activityContent}>
        <div className={styles.wrapper}>
          <div className={styles.actionButtons}>
          </div>
          <h3>
            <div className={styles.mark} onClick={this.changeStatus}>
              <img alt={"status"} className={cx({
                markedAsDone: done === true,
                markedAsNotDone: done === false
              })} src={doneMark}/>
            </div>
            <span className={styles.activityWrapper}>{subject}</span>
          </h3>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.activityDetails}>
            <span
              className={this.checkTime(date, hasStartTime, this.props.activity.done)}>
                        {dateFormater(date, hasStartTime)}</span>
            <span className={styles.separator}>
            </span>
            <span className={styles.author}>{this.props.author}</span>
          </div>
          <div className={styles.relatedItems}>
          </div>
        </div>
      </div>
    )
  }
}

export default Activity;

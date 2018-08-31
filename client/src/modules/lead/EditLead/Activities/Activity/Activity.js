import React, {Component} from "react";
import styles from "./Activity.css";
import doneMark from "../../../../../assets/done-mark.svg"
import {dateFormater} from "./dateFormatter";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class Activity extends Component {

  changeStatus = e => {
    e.preventDefault();
  };

  checkTime = (date, hasStartTime, status) => {
    let activityFullDate = new Date(date);
    let activityDate = new Date(activityFullDate.toLocaleDateString());
    let currentDate = new Date(new Date().toLocaleDateString());

    if (status) {
      return styles.defaultTime;
    } else {
      if (currentDate.getTime() === activityDate.getTime()) {
        if (hasStartTime) {
          if (activityFullDate.getTime() < new Date().getTime()) {
            return styles.expiredTime;
          }
          return styles.defaultTime;
        }
        return styles.today;
      }
      if (currentDate.getTime() > activityDate.getTime()) {
        return styles.expiredTime;
      }
    }
  };

  render() {
    return (
      <div className={styles.activityContent}>
        <div className={styles.wrapper}>
          <div className={styles.actionButtons}>
          </div>
          <h3>
            <div className={styles.mark} onClick={this.changeStatus}>
              <img alt={"status"} className={cx({
                markedAsDone: this.props.activity.done === true,
                markedAsNotDone: this.props.activity.done === false
              })} src={doneMark}/>
            </div>
            <span className={styles.activityWrapper}>{this.props.activity.subject}</span>
          </h3>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.activityDetails}>
            <span
              className={this.checkTime(this.props.activity.date, this.props.activity.hasStartTime, this.props.activity.done)}>
                        {dateFormater(this.props.activity.date, this.props.activity.hasStartTime)}</span>
            <span className={styles.separator}></span>
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

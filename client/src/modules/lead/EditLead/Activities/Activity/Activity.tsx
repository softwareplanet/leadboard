import * as React from 'react';
import * as styles  from './Activity.css';
import doneMark from '../../../../../assets/done-mark.svg'
import { dateFormatter } from './dateFormatter';
import { updateActivity } from '../activityActions';
import store from '../../../../../store.js';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';

const cx = classNames.bind(styles);

export interface Props {
  activity: any;
}

class Activity extends React.Component<Props, object> {

  public render() {
    const { date, hasStartTime, done, subject } = this.props.activity;
    return (
      <div className={styles.activityContent}>
        <div className={styles.wrapper}>
          <h3>
            <div className={styles.mark} onClick={this.changeStatus}>
              <img alt={'status'} className={cx({
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
                        {dateFormatter(date, hasStartTime)}</span>
            <span className={styles.separator} />
          </div>
          <div className={styles.relatedItems} />
        </div>
      </div>
    )
  }
  private changeStatus = (e: any) => {
    e.preventDefault();
    const activity = { ...this.props.activity };
    activity.done = !activity.done;
    store.dispatch(updateActivity(activity));
  };

  private checkTime = (date: Date, hasStartTime: boolean, status: boolean) => {
    const activityDate = new Date(date);
    const now = new Date();

    if (status) {
      return styles.defaultTime;
    } else {
      if (moment(now).isSame(activityDate, "day")) {
        if (hasStartTime) {
          if (moment(now).isAfter(activityDate)) {
            return styles.expiredTime;
          } else {
            return styles.defaultTime;
          }
        }
        return styles.today;
      } if (moment(now).isAfter(activityDate)){
        return styles.expiredTime;
      } else {
        return styles.defaultTime;
      }
    }
  };
}

export default Activity;

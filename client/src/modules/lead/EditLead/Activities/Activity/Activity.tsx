import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import * as React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
// import * as Modal from "react-modal";
import doneMark from '../../../../../assets/done-mark.svg'
import spreadButton from '../../../../../assets/spread-button.svg';
import ActivityModel from '../../../../../models/Activity'
import store from '../../../../../store.js';
import { updateActivity } from '../activityActions';
import * as styles  from './Activity.css';
import { dateFormatter } from './dateFormatter';

const cx = classNames.bind(styles);

interface Props {
  activity: ActivityModel;
}

interface State {
  isModalOpen : boolean;
  isPopoverOpen: boolean;
}

class Activity extends React.Component<Props, State> {

  public componentWillMount() {
    this.setState({
      isPopoverOpen: false
    })
  }

  public render() {
    const { date, hasStartTime, done, subject } = this.props.activity;
    return (
      <div className={styles.activityContent}>
        <div className={styles.wrapper}>
          <div className={styles.activityHeader}>
            <div className={styles.activityMainInfo}>
              <div className={styles.mark} onClick={this.changeStatus}>
                <img alt="status" className={cx({
                  markedAsDone: done === true,
                  markedAsNotDone: done === false
                })} src={doneMark}/>
              </div>
              <span className={styles.activityWrapper}>{subject}</span>
            </div>
            <div> 
              <img 
                id={`id${this.props.activity._id}`} 
                onClick={this.togglePopover} 
                className={styles.spreadButton} 
                src={spreadButton} 
                alt="options" 
              />
              <Popover 
              placement="bottom-end"
              isOpen={this.state.isPopoverOpen} 
              target={`id${this.props.activity._id}`} 
              toggle={this.togglePopover}
            >
              <PopoverBody className={styles.popover}>
                <ul className={styles.list}>
                  <li className={styles.listElement} onClick={this.togglePopover}>Edit</li>
                </ul>
              </PopoverBody>
            </Popover>
            </div>
          </div>
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

  private togglePopover = () => {
    this.setState({
      ...this.state,
      isPopoverOpen: !this.state.isPopoverOpen
    })
  }

  private changeStatus = (e: any) => {
    e.preventDefault();
    const activity = { ...this.props.activity };
    activity.done = !activity.done;
    store.dispatch(updateActivity(activity));
  };

  private checkTime = (date: Date, hasStartTime: boolean, status: boolean) => {
    const activityDate = date;
    const now = new Date();
    if (status) {
      return styles.defaultTime;
    } else {
      if (moment(now).isSame(activityDate, 'day')) {
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

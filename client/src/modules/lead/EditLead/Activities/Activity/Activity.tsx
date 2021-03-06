import * as moment from 'moment';
import * as React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import doneMark from '../../../../../assets/img/done-mark.svg';
import spreadButton from '../../../../../assets/img/spread-button.svg';
import ActivityModel from '../../../../../models/Activity';
import store from '../../../../../store.js';
import { deleteActivity, updateActivity } from '../activityActions';
import EditActivityModal from '../EditActivityModal/EditActivityModal';
import * as styles from './Activity.css';
import { dateFormatter } from './dateFormatter';

interface Props {
  activity: ActivityModel;
}

interface State {
  isModalOpen: boolean;
  isPopoverOpen: boolean;
}

class Activity extends React.Component<Props, State> {

  public state: State = {
    isModalOpen: false,
    isPopoverOpen: false,
  };

  public render() {
    const { date, hasStartTime, done, subject } = this.props.activity;
    return (
      <div className={styles.activityContent}>
        <div className={styles.wrapper}>
          <div className={styles.activityHeader}>
            <div className={styles.activityMainInfo}>
              <div className={styles.mark} onClick={this.changeStatus}>
                <img 
                  alt="status" 
                  src={doneMark}
                  className={done ? styles.markedAsDone : styles.markedAsNotDone}
                />
              </div>
              <span onClick={this.onEditClick} className={styles.activityWrapper}>{subject}</span>
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
                    <li className={styles.listElement} onClick={this.onEditClick}>Edit</li>
                    <li className={styles.listElement} onClick={this.onDeleteClick}>Delete</li>
                  </ul>
                </PopoverBody>
              </Popover>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.activityDetails}>
            <span
              className={this.checkTime(date, hasStartTime, this.props.activity.done)}
            >
              {dateFormatter(date, hasStartTime)}
            </span>
            <span className={styles.separator} />
          </div>
          <div className={styles.relatedItems} />
        </div>
        <EditActivityModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          activity={this.props.activity}
          onSave={this.onSave}
        />
      </div>
    );
  }

  private onSave = (activity: ActivityModel) => {
    store.dispatch(updateActivity(activity));
    this.closeModal();
  };

  private onEditClick = () => {
    if (this.state.isPopoverOpen) {
      this.togglePopover();
    }
    this.setState({
      isModalOpen: true,
    });
  };

  private onDeleteClick = () => {
    this.togglePopover();
    if (confirm('Are you sure?')) {
      store.dispatch(deleteActivity(this.props.activity));
    }
  };

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  private togglePopover = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  private changeStatus = (e: any) => {
    e.preventDefault();
    const activity = {
      _id: this.props.activity._id,
      done: !this.props.activity.done,
    };
    store.dispatch(updateActivity(activity));
  };

  private checkTime(date: Date, hasStartTime: boolean, status: boolean) {
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
      }
      if (moment(now).isAfter(activityDate)) {
        return styles.expiredTime;
      } else {
        return styles.defaultTime;
      }
    }
  };
}

export default Activity;

import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Activities.css";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import InfoItemWrapper from "../../../common/InfoWraper/InfoItemWrapper";
import Activity from "./Activity/Activity";
import callIcon from "../../../../assets/img/call-activity.svg";
import meetingIcon from "../../../../assets/img/meeting-activity.svg";
import taskIcon from "../../../../assets/img/task-activity.svg";
import deadlineIcon from "../../../../assets/img/deadline-activity.svg";
import emailIcon from "../../../../assets/img/email-activity.svg";
import lunchIcon from "../../../../assets/img/lunch-activity.svg";

class Activities extends Component {
  getActivityIcon = type => {
    switch (type) {
      case "Call":
        return callIcon;
      case "Meeting":
        return meetingIcon;
      case "Task":
        return taskIcon;
      case "Deadline":
        return deadlineIcon;
      case "Email":
        return emailIcon;
      case "Lunch":
        return lunchIcon;
      default:
        return callIcon;
    }
  };

  render() {
    const hasActivities = !isEmpty(this.props.activities);
    return (
      <div className={styles.container}>
        {hasActivities ?
          <div className={this.props.done ? styles.pastTimeLineBar : styles.plannedTimeLineBar} /> : null}
        {hasActivities ? this.props.activities.map(activity => (
            <InfoItemWrapper
              key={activity._id}
              component={<Activity activity={activity} />}
              icon={this.getActivityIcon(activity.type)}
              cardStyles={styles.activityCard}
              arrowStyles={styles.arrow}
            />
          ))
          : <p className={styles.noActivitiesMessage}>You have no planned activities</p>}
      </div>
    );
  }
}

Activities.propTypes = {
  activities: PropTypes.array,
};

export default Activities;

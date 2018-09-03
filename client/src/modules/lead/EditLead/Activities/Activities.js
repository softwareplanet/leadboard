import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Activities.css";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import InfoItemWrapper from "../../../common/InfoWraper/InfoItemWrapper";
import Activity from "./Activity/Activity";
import callIcon from "../../../../assets/call-activity.svg";
import meetingIcon from "../../../../assets/meeting-activity.svg";
import taskIcon from "../../../../assets/task-activity.svg";
import deadlineIcon from "../../../../assets/deadline-activity.svg";
import emailIcon from "../../../../assets/email-activity.svg";
import lunchIcon from "../../../../assets/lunch-activity.svg";

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
    const isExistActivities = getActivitiesStatus(this.props.done , this.props.activities);
    return (
      <div className={styles.container}>
        {isExistActivities ?
          <div className={this.props.done ? styles.pastTimeLineBar : styles.plannedTimeLineBar} /> : null}
        {isExistActivities ? this.props.activities.map((activity) => {
            if (activity.done === this.props.done) {
              return (
                <InfoItemWrapper
                  key={activity._id}
                  component={<Activity activity={activity} />}
                  icon={this.getActivityIcon(activity.type)}
                  cardStyles={styles.activityCard}
                  arrowStyles={styles.arrow}
                />
              );
            }
          })
          : <p className={styles.noActivitiesMessage}>You have no activities</p>}
      </div>
    );
  }
}

const getActivitiesStatus = (isDone, activities) => {
  if (isDone) {
    return getCountOfDoneActivities(activities) > 0;
  }else{
    return getCountOfPlannedActivities(activities) > 0;
  }
};

const getCountOfDoneActivities = (activities) => {
  return activities.filter(activity => activity.done).length;
};

const getCountOfPlannedActivities = (activities) => {
  return activities.filter(activity => !activity.done).length;
};

const mapStateToProps = state => ({
  activities: state.leads.editLead.activities,
  leadId: state.leads.editLead.lead._id,
});

Activities.propTypes = {
  loadLeadActivities: PropTypes.func.isRequired,
  activities: PropTypes.object,
};

export default connect(mapStateToProps)(Activities);
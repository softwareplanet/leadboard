import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Activities.css";
import PropTypes from "prop-types";
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
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.timeLineBar} />
                {this.props.editLead ? this.props.editLead.activity.map((activity) => {
                    return (
                        <InfoItemWrapper
                            key={activity._id}
                            component={<Activity />}
                            icon={this.getActivityIcon(activity.type)}
                            cardStyles={styles.activityCard}
                            arrowStyles={styles.arrow}
                            activity={activity}/>
                    );
                }) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editLead: state.leads.editLead,
});

Activities.PropTypes = {
    editLead: PropTypes.object
};

export default connect(mapStateToProps)(Activities);
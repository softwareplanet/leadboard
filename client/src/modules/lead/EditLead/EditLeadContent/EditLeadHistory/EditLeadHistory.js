import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Activities from "../../Activities/Activities";
import Notes from "./Notes/Notes";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { isEmpty } from "lodash";
import styles from "./EditLeadHistory.css";

const tabStyles = {
  tabsIndicator: {
    backgroundColor: "#800ace",
  },
  tabRoot: {
    font: "400 12px/16px Open Sans,sans-serif",
    minHeight: "35px",
    minWidth: "110px",
    "&:focus": {
      outline: "none",
    },
  },
};

class EditLeadHistory extends React.Component {
  state = {
    selectedTab: 0,
  };

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={styles.sectionTag}>
          <span className={styles.pill}>PLANNED</span>
        </div>
        <Activities done={false} />
        <div className={styles.sectionTag}>
          <span className={styles.pill}>PAST</span>
        </div>
        <Tabs
          classes={{ indicator: classes.tabsIndicator }}
          value={selectedTab}
          onChange={this.handleChange}
          centered={true}>

          <Tab label={`NOTES ${this.props.notesCount}`} classes={{ root: classes.tabRoot }} />
          <Tab label={`ACTIVITIES ${this.props.activitiesCount}`} classes={{ root: classes.tabRoot }} disabled={ !isEmpty(this.props.activities) ? false : true} />
        </Tabs>
        {selectedTab === 0 && <Notes />}
        {selectedTab === 1 && <Activities done={true} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const notes = state.leads.editLead.lead.notes;
  const activities = state.leads.editLead.activities;
  return {
    notesCount: !isEmpty(notes) ? notes.length : "",
    activitiesCount: !isEmpty(activities) ? getCountOfDoneActivities(activities) : "",
  };
};

const getCountOfDoneActivities = (activities) =>{
  return activities.filter(activity => activity.done).length;
};

export default compose(
  connect(mapStateToProps),
  withStyles(tabStyles),
)(EditLeadHistory);

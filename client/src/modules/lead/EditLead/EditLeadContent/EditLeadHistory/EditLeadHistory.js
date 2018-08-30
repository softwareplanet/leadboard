import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notes from "../../Notes/Notes";
import Activities from "../../Activities/Activities";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { isEmpty } from "lodash";

const styles = {
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
        <Tabs
          classes={{ indicator: classes.tabsIndicator }}
          value={selectedTab}
          onChange={this.handleChange}
          centered={true}>

          <Tab label={`NOTES ${this.props.notesCount}`} classes={{ root: classes.tabRoot }} />
          <Tab label={`ACTIVITIES ${this.props.activitiesCount}`} classes={{ root: classes.tabRoot }} />
        </Tabs>
        {selectedTab === 0 && <Notes />}
        {selectedTab === 1 && <Activities />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notesCount: !isEmpty(state.leads.editLead.lead) ? state.leads.editLead.lead.notes.length !== 0 ? state.leads.editLead.lead.notes.length : "" : "",
  activitiesCount: "",
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(EditLeadHistory);

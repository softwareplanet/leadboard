import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Notes from "../../Notes/Notes";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";


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

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

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
        </Tabs>
        {selectedTab === 0 && <TabContainer><Notes /></TabContainer>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notesCount: state.leads.editLead ? state.leads.editLead.notes.length : "",
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(EditLeadHistory);

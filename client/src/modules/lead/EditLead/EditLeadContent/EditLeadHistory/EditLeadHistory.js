import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Notes from "../../Notes/Notes";
import { withStyles } from "@material-ui/core/styles";

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
    itemsCount: {
      notes: "",
    },
  };

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  setCount = (entity, count) => {
    let newState = { ...this.state };
    newState.itemsCount[entity] = count;
    this.setState(newState);
  };

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Tabs
          classes={{indicator: classes.tabsIndicator}}
          value={selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          centered={true}>

          <Tab label={`NOTES ${this.state.itemsCount.notes}`} classes={{root: classes.tabRoot}} />
        </Tabs>
        {selectedTab === 0 && <TabContainer><Notes setCount={this.setCount} /></TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(EditLeadHistory);

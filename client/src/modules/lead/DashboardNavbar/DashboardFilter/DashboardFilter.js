import React, { Component } from "react";
import styles from "./DashboardFilter.css";
import filterIcon from "../../../../assets/filter-icon.svg";
import downArrowIcon from "../../../../assets/down-arrow.svg";
import DashboardFilterPopover from "./DashboardFilterPopover/DashboardFilterPopover";
import { IN_PROGRESS, LOST, WON } from "../../../../constants";
import { loadLeadboard } from "../../leadActions";
import { connect } from "react-redux";

const filters = [
  { text: "Leads in progress", type: IN_PROGRESS},
  { text: "All won leads",  type: WON },
  { text: "All lost leads", type: LOST },
];

class DashboardFilter extends Component {
  state = {
    isPopoverOpen: false,
  };

  togglePopover = () => {
    this.setState(prevState => {
      return { isPopoverOpen: !prevState.isPopoverOpen };
    });
  };

  onFilterClick = (leadType) => {
    this.props.loadLeadboard(leadType);
    this.togglePopover();
  };

  render() {
    return (
      <div>
        <button id="filter-button" className={styles.filterButton} onClick={this.togglePopover}>
          <span className={styles.iconSpan}><img src={filterIcon} alt="Filter icon" /></span>
          <span className={styles.filterSpan}>Filter</span>
          <span className={styles.iconSpan}><img src={downArrowIcon} alt="Down arrow icon" /></span>
        </button>
        <DashboardFilterPopover
          isOpen={this.state.isPopoverOpen}
          target="filter-button"
          toggle={this.togglePopover}
          onFilterClick={this.onFilterClick}
          filters={filters}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leads
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(DashboardFilter)
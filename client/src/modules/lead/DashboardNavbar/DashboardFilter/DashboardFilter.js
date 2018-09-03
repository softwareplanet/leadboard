import React, { Component } from "react";
import styles from "./DashboardFilter.css";
import filterIcon from "../../../../assets/filter-icon.svg";
import downArrowIcon from "../../../../assets/down-arrow.svg";
import DashboardFilterPopover from "./DashboardFilterPopover/DashboardFilterPopover";

const filters = [
  { text: "All leads" },
  { text: "All won leads" },
  { text: "All lost leads" },
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

  onFilterClick = () => {
    alert("Clicked");
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

export default DashboardFilter;
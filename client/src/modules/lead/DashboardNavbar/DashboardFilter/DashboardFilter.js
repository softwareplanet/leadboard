import React, { Component } from "react";
import styles from "./DashboardFilter.css";
import filterIcon from "../../../../assets/filter-icon.svg";
import downArrowIcon from "../../../../assets/down-arrow.svg";

class DashboardFilter extends Component {
  render() {
    return (
      <div>
        <button className={styles.filterButton}>
          <span className={styles.iconSpan}><img src={filterIcon} alt="Filter icon" /></span>
          <span className={styles.filterSpan}>Filter</span>
          <span className={styles.iconSpan}><img src={downArrowIcon} alt="Down arrow icon" /></span>
        </button>
      </div>
    );
  }
}

export default DashboardFilter;
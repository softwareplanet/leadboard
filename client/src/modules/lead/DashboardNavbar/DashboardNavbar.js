import React, { Component } from "react";
import AddLead from "../AddLead/AddLead";
import DashboardFilter from "../DashboardNavbar/DashboardFilter/DashboardFilter";
import styles from "./DashboardNavbar.css";

class DashboardNavbar extends Component {
  render() {
    return (
      <div className={styles.dashboardNavbar}>
        <AddLead />
        <DashboardFilter />
      </div>
    );
  }
}

export default DashboardNavbar;
import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";

export default class EditLeadSidebar extends Component {
  render() {
    return <div className={styles.sidebar}>
        <EditCard/>
    </div>;
  }
}

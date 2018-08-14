import React, { Component } from "react";
import Navbar from "../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import EditLeadActivity from "./EditLeadAcitivity/EditLeadActivity";
import styles from "./EditLead.css";

export default class EditLead extends Component {
  render() {
    return (
      <div className={"edit-lead"}>
        <Navbar />
        <div className={styles.container}>
          <EditLeadHeader match={this.props.match} />
        </div>
        <div className={styles.mainContainer}>
          <EditLeadSidebar />
          <EditLeadActivity />
        </div>
      </div>
    );
  }
}

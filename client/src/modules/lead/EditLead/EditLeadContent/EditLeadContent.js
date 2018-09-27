import React, { Component } from "react";
import EditLeadTabs from "./EditLeadTabs/EditLeadTabs";
import styles from "./EditLeadContent.css";
import LeadHistory from "./EditLeadHistory/LeadHistory";

export default class EditLead extends Component {

  render() {
    return (
      <div className={styles.content}>
        <EditLeadTabs />
        <LeadHistory />
      </div>
    );
  }
}

import React, { Component } from "react";
import EditLeadTabs from "./EditLeadTabs/EditLeadTabs";
import styles from "./EditLeadContent.css";
import EditLeadHistory from "./EditLeadHistory/EditLeadHistory";

export default class EditLead extends Component {

  render() {
    return (
      <div className={styles.content}>
        <EditLeadTabs />
        <EditLeadHistory />
      </div>
    );
  }
}

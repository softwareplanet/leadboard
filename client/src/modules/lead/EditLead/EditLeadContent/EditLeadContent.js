import React, { Component } from "react";
import EditLeadTabs from "./EditLeadTabs/EditLeadTabs";
import styles from "./EditLeadContent.css";
import Notes from "../Notes/Notes";
import Activities from "../Activities/Activities";

export default class EditLead extends Component {

  render() {
    return (
      <div className={styles.content}>
        <EditLeadTabs />
        <Activities />
        <Notes />
      </div>
    );
  }
}

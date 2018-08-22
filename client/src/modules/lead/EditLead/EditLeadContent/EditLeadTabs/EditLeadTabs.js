import React, { Component } from "react";
import styles from "./EditLeadTabs.css";
// import { addActivityIcon, addActivityIconActive } from "../../../../../assets/add-activity";
// import { takeNotesIcon, takeNotesIconActive } from "../../../../../assets/take-notes";
import addActivityIcon from "../../../../../assets/add-activity/add-activity.svg";
import takeNotesIcon from "../../../../../assets/take-notes/take-notes.svg";
import sendEmailIcon from "../../../../../assets/send-email/send-email.svg";
import uploadFilesIcon from "../../../../../assets/upload-files/upload-files.svg";

function importAll(r) {
  console.log(r.keys())
  return r.keys().map(r);
}

const images = importAll(require.context('../../../../../assets', true, /\.(png|jpe?g|svg)$/));

export default class EditLeadTabs extends Component {
  state = {
    activeTab: null,
  }

  render() {
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem} onClick={() => this.setState({ activeTab: "<EditLeadEditor />" })}>
            <img onClick={e => e.stopPropagation()} src={this.state.activeTab === "<EditLeadEditor />" ? takeNotesIcon : takeNotesIcon} className={styles.headerItemIcon} alt="take note icon" />
            Take notes
          </li>
          <li className={styles.headerItem} onClick={() => this.setState({ activeTab: "<AddActivity />" })}>
            <img onClick={e => e.stopPropagation()} src={addActivityIcon} className={styles.headerItemIcon} alt="add activity icon" />
            Add activity
          </li>
          <li className={styles.headerItem} onClick={() => this.setState()}>{/* Send email */}</li>
          <li className={styles.headerItem} onClick={() => this.setState()}>{/* Upload files */}</li>
          <li className={styles.headerItem} onClick={() => this.setState()}>{/* Close button */}</li>
        </ul>
        <div className={styles.content}>
          Content
          {this.state.activeTab}
        </div>
      </div>
    );
  }
}

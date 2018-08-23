import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

import takeNotesIcon from "../../../../../assets/take-notes/take-notes.svg"
import takeNotesIconActive from "../../../../../assets/take-notes/take-notes-active.svg"
import addActivitiIcon from "../../../../../assets/add-activity/add-activity.svg"
import addActivitiIconActive from "../../../../../assets/add-activity/add-activity-active.svg"

export default class EditLeadTabs extends Component {
  state = {
    activeTab: null
  };

  tabHandler = content => {
    this.setState({ activeTab: content });
  };

  render() {
    let takeNotesCondition = this.state.activeTab === "<EditLeadEditor />" || this.state.activeTab === null;
    let addActivityCondition = this.state.activeTab === "<AddActivity />";
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem} onClick={() => this.tabHandler("<EditLeadEditor />")}>
            <img
              src={takeNotesCondition ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li className={styles.headerItem} onClick={() => this.tabHandler("<AddActivity />")}>
            <img
              src={addActivityCondition ? addActivitiIconActive : addActivitiIcon}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.state.activeTab ? (
          <div className={styles.content}>{this.state.activeTab}</div>
        ) : (
          <div className={styles.fakeNote} onClick={() => this.tabHandler("<EditLeadEditor />")}>Click here to take notes...</div>
        )}
      </div>
    );
  }
}

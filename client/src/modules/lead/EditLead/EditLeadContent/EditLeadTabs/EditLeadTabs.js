import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

var context = require.context("../../../../../assets", true, /\.svg$/);
var images = {};
context.keys().forEach(function(key) {
  let newKey = key
    .split("/")
    .pop()
    .slice(0, -4);
  images[newKey] = context(key);
});
console.log(images);

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
              src={takeNotesCondition ? images["take-notes-active"] : images["take-notes"]}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          {/* <li className={styles.headerItem} onClick={() => this.tabHandler("<AddActivity />")}>
            <img
              src={addActivityCondition ? images["add-activity-active"] : images["add-activity"]}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li> */}
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

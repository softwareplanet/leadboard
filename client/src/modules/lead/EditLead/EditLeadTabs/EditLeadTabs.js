import React, { Component } from "react";
import styles from "./EditLeadTabs.css";
import addActivityIcon from "../../../../assets/add-activity.svg";
import takeNotesIcon from "../../../../assets/take-notes.svg";

export default class EditLeadTabs extends Component {
  onChange = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  render() {
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem}>
            <img src={takeNotesIcon} className={styles.headerItemIcon} alt="take note icon"/>
            Take notes
          </li>
          <li className={styles.headerItem}>
            <img src={addActivityIcon} className={styles.headerItemIcon} alt="add activity icon"/>
            Add activity
          </li>
          <li className={styles.headerItem}></li>{/* Send email */}
          <li className={styles.headerItem}></li>{/* Upload files */}
          <li className={styles.headerItem}></li>{/* Close button */}
        </ul>
        <div className={styles.editor}>
          <textarea className={styles.textArea}/>
          <div className={styles.footer}>
            <button className={styles.button}><span>Cancel</span></button>
            <button className={styles.buttonSave}><span>Save</span></button>
          </div>
        </div>
      </div>
    );
  }
}

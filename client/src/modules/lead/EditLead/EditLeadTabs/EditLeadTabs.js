import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

export default class EditLeadTabs extends Component {
  render() {
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem}>Take notes</li>
          <li className={styles.headerItem}>Add activity</li>
          <li className={styles.headerItem}></li>{/* Send email */}
          <li className={styles.headerItem}></li>{/* Upload files */}
          <li className={styles.headerItem}></li>{/* Close button */}
        </ul>
        <div className={styles.content}>
          Footer
        </div>
      </div>
    );
  }
}

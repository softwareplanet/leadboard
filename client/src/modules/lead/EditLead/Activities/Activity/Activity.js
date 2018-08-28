import React, { Component } from "react";
import styles from "./Activity.css";

class Activity extends Component {
    render() {
        return (
            <div className={styles.activityContent}>
                <div className={styles.actionButtons}>

                </div>
                <h3>
                    <span className={styles.doneMark}>
                        <label className={styles.checkBox}>

                        </label>
                    </span>
                    <a className={styles.activityWrapper}>Bob</a>
                </h3>
                <div className={styles.activityDetails}>
                </div>
                <div className={styles.relatedItems}>
                </div>
            </div>
        )
    }
}

export default Activity;
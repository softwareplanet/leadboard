import React, { Component } from "react";
import styles from "./Activity.css";

class Activity extends Component {
    render() {
        return (
            <div className={styles.activityContent}>
                <div className={styles.actionButtons}></div>
                <h3>
                    <span className={styles.doneMark}>
                    </span>
                    <a className={styles.activityWrapper}></a>
                </h3>
                <div className={styles.activityDetails}>
                </div>
                <div className={styles.relatedItems}>
                </div>
            </div>
        )
    }
}
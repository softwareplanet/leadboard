import React, { Component } from "react";
import styles from "./Activity.css";
import doneMark from "../../../../../assets/done-mark.svg"
import { dateFormater } from "./dateFormatter";

class Activity extends Component {

    changeStatus = e => {
        e.preventDefault();
        e.target.className = styles.markAsDone;
    };

    getDateStyles = () =>{
      return styles.today
    };

    render() {
        return (
            <div className={styles.activityContent}>
               <div className={styles.wrapper}>
                   <div className={styles.actionButtons}>
                    </div>
                    <h3>
                    <div className={styles.mark} onClick={this.changeStatus}>
                            <img className={this.props.activity.done ? styles.markAsDone : styles.markAsNotDone} src={doneMark} />
                    </div>
                    <span className={styles.activityWrapper}>{this.props.activity.subject}</span>
                </h3>
               </div>
                <div className={styles.wrapper}>
                <div className={styles.activityDetails}>
                    <span>
                        {dateFormater(this.props.activity.date, this.props.activity.hasStartTime)}
                    </span>
                    <span className={styles.separator}></span>
                    <span className={styles.author}>{this.props.author}</span>
                </div>
                <div className={styles.relatedItems}>

                </div>
            </div>
            </div>
        )
    }
}

export default Activity;

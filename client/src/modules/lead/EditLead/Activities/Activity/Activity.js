import React, { Component } from "react";
import styles from "./Activity.css";
import doneMark from "../../../../../assets/done-mark.svg"
import { dateFormater } from "./dateFormatter";

class Activity extends Component {

    changeStatus = e => {
        e.preventDefault();
        e.target.className = styles.markAsDone;
    };

    checkDate = date => {
      if(date === Date.now()){
          return <span className={styles.today}>
              Today
          </span>
      }
    };

    render() {
        let today = new Date("2018-07-30 06:30:00.000");
        let hasStartTime = true;
        return (
            <div className={styles.activityContent}>
               <div className={styles.wrapper}>
                   <div className={styles.actionButtons}>
                    </div>
                    <h3>
                    <div className={styles.mark} onClick={this.changeStatus}>
                            <img className={styles.markAsNotDone} src={doneMark} />
                    </div>
                    <span className={styles.activityWrapper}>Bob</span>
                </h3>
               </div>
                <div className={styles.wrapper}>
                <div className={styles.activityDetails}>
                    <span>
                        {dateFormater(today, hasStartTime)}
                    </span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.author}>{this.props.author}Влад Тимофеев</span>
                </div>
                <div className={styles.relatedItems}>

                </div>
            </div>
            </div>
        )
    }
}

export default Activity;
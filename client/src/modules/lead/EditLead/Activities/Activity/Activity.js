import React, { Component } from "react";
import styles from "./Activity.css";
import doneMark from "../../../../../assets/done-mark.svg"

class Activity extends Component {

    checkDate = date => {
      if(date === Date.now()){
          return <span className={styles.today}>
              Today
          </span>
      }
    };

    render() {
        let today = Date.now();

        return (
            <div className={styles.activityContent}>
               <div className={styles.wrapper}>
                   <div className={styles.actionButtons}>
                    </div>
                    <h3>
                    <span className={styles.markAsDone}>
                        <input type="checkBox" className={styles.checkBox} />
                    </span>
                    <span className={styles.activityWrapper}>Bob</span>
                </h3>
               </div>
                <div className={styles.wrapper}>
                <div className={styles.activityDetails}>
                    <span>
                        {this.checkDate(today)}
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
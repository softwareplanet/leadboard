import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import noteIcon from "../../../../../assets/note-icon.svg";
import { formatDate } from "../../../../../utils/formatDate"
const space = "&nbsp;";

class Note extends Component {
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.iconWrapper}>
          <span className={styles.noteIcon}>
          <img src={noteIcon} alt="note" className={styles.icon}/>
          </span>
	  </span>
        <span className={styles.arrow}/>
        <div className={styles.note}>
          <div className={styles.noteContent}>
            {/*<div className={styles.dateWrapper}>*/}
            {/*<span>{this.props.date}</span>*/}
            {/*<span>{this.props.user}</span>*/}
            {/*</div>*/}
            <div className={styles.dateWrapper}>
              <span>{formatDate(this.props.date)}</span>
              {/*<span>{new Date(this.props.date).toDateString()}</span>*/}
              <span name="separator">&nbsp; &#183; &nbsp;</span>{this.props.user}
            </div>
            <div className={styles.textWrapper}>
              <span>{this.props.text}</span>
            </div>
            <div className="fade">
              <div>
                {space}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
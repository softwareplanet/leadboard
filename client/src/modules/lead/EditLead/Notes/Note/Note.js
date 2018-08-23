import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import { formatDate } from "../../../../../utils/formatDate";

class Note extends Component {
  render() {
    let { date, user, text } = this.props.note;
    return (
      <div className={styles.noteContent}>
        <div className={styles.dateWrapper}>
          <span>{formatDate(date)}</span>
          <span name="separator">&nbsp; &#183; &nbsp;</span>{user.firstname + " " + user.lastname}
        </div>
        <div className={styles.textWrapper}>
          <span>{text}</span>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;
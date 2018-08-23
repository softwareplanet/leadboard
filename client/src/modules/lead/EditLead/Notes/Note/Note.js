import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import { formatDate } from "../../../../../utils/formatDate"

class Note extends Component {
  render() {
    return (
          <div className={styles.noteContent}>
            <div className={styles.dateWrapper}>
              <span>{formatDate(this.props.date)}</span>
              <span name="separator">&nbsp; &#183; &nbsp;</span>{this.props.user}
            </div>
            <div className={styles.textWrapper}>
              <span>{this.props.text}</span>
            </div>
          </div>
    );
  }
}

Note.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default Note;

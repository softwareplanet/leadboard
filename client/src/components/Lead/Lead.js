import React, { Component } from "react";
import styles from './Lead.css';

class Lead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.head}>{this.props.lead.name}</div>
        <div className={styles.subhead}>{this.props.lead.company}</div>
      </div>
    );
  }
}

export default Lead;

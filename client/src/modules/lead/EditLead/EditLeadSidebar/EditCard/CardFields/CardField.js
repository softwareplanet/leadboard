import React, { Component } from "react";
import styles from "./CardField.css";
import { Link } from "react-router-dom";


class CardField extends Component {
  render() {
    console.log(this.props.customFieldValue)
    let addValue = (
      <span className={styles.addValue}>
        <Link to=' '>+ Add value</Link>
      </span>
    );
    let value = (
      <div id="fieldValue" className={styles.customFieldValueWrap}>
        <span className={styles.customFieldValue}>
          <Link to=' '>{this.props.customFieldValue}</Link>
        </span>
      </div>
    );
    return (
      <div className={styles.fieldValue}>
        <div className={styles.customFieldsWrapper}>
          <div id="fieldLabel" className={styles.customFieldLabelWrap}>
            <span className={styles.customFieldLabel}>{this.props.customFieldName}</span>
          </div>
          {this.props.customFieldValue.length === 0 ? addValue : value}
        </div>
      </div>
    )
  }
}

export default CardField;
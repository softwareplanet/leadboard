import React, { Component } from "react";
import styles from "./CardField.css";
import { Link } from "react-router-dom";
import isBlank from '../../../../../../utils/isBlank';


class CardField extends Component {
  render() {
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
      <div className={styles.customValue}>
        <div className={styles.allCustomFieldsWrapper}>
          <div className={styles.customFieldsWrapper}>
            <div id="fieldLabel" className={styles.customFieldLabelWrap}>
              <span className={styles.customFieldLabel}>{this.props.customFieldName}</span>
            </div>
            {isBlank(this.props.customFieldValue) ? addValue : value}
          </div>
        </div>
      </div>
    )
  }
}

export default CardField;

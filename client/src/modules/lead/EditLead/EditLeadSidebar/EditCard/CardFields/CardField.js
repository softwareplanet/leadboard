import React, { Component } from "react";
import styles from "./CardField.css";
import SingleEditView from "./EditView/SingleEditView/SingleEditView";
import PropTypes from "prop-types";
import isBlank from "../../../../../../utils/isBlank";
import EditButton from "../EditButton/EditButton";

class CardField extends Component {

  state = {
    isInEditMode: false,
  };

  openEditMode = () => {
    this.setState({ isInEditMode: true });
  };

  closeEditMode = () => {
    this.setState({ isInEditMode: false });
  };

  render() {
    const { name, value } = this.props.field;
    const { isInEditMode } = this.state;

    let valueAdd = (
      <span className={styles.addValue} onClick={this.openEditMode}>
          + Add value
      </span>
    );
    let valueShow = (
      <div id="fieldValue" className={styles.customFieldValueWrap}>
        <span className={styles.customFieldValue}>
          {value}
        </span>
      </div>
    );
    return (
      <div className={styles.customValue}>
        {
          !isInEditMode &&
          <div className={styles.customFieldsWrapper}>
            <div id="fieldLabel" className={styles.customFieldLabelWrap}>
              <span className={styles.customFieldLabel}>{name}</span>
            </div>
            {isBlank(value) ? valueAdd : valueShow}
            {
              !isBlank(value) && <EditButton onClick={this.openEditMode} style={styles.editButton} />
            }
          </div>
        }
        {
          this.state.isInEditMode &&
          <SingleEditView
            fieldName={name}
            fieldValue={value}
            onChange={this.props.onUpdate}
            onCancel={this.closeEditMode} />
        }
      </div>
    );
  }
}

CardField.propTypes = {
  field: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default CardField;

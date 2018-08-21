import React, { Component } from "react";
import styles from "./SingleEditView.css";
import EditFieldGroup from "../EditFieldGroup/EditFieldGroup";
import PropTypes from "prop-types";

class SingleEditView extends Component {

  state = {
    updatedValue: this.props.fieldValue,
  };

  onChangeEditField = (name, value) => {
    this.setState({ updatedValue: value });
  };

  onSaveClicked() {
    this.props.onChange(this.props.fieldName, this.state.updatedValue);
  };

  render() {
    return (
      <div className={styles.editView}>
        <EditFieldGroup
          name={this.props.fieldName}
          value={this.props.fieldValue}
          onChange={this.onChangeEditField}
        />
        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={this.props.onCancel}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={this.onSaveClicked.bind(this)}>
            Save
          </button>
        </div>
      </div>
    );
  }


}

SingleEditView.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

export default SingleEditView;
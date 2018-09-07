import React, { Component } from "react";
import styles from "./BulkEditView.css";
import commonStyles from "../../../../../../../../styles/common.css";
import EditFieldGroup from "../EditFieldGroup/EditFieldGroup";
import PropTypes from "prop-types";
import isBlank from "../../../../../../../../utils/isBlank";

class BulkEditView extends Component {

  state = {
    name: "",
  }

  componentDidMount() {
    this.setState({
      ...this.props.model,
    });
  }

  onChangeEditField = (name, value) => {
    if (name === "Name") {
      this.setState({ name: value });
    } else {
      let updatedCustom = [...this.state.custom];
      const customField = updatedCustom.find(custom => custom.name === name);
      const customFieldIndex = updatedCustom.indexOf(customField);
      let updatedCustomField = { ...customField };
      updatedCustomField.value = value;
      updatedCustom.splice(customFieldIndex, 1, updatedCustomField);
      this.setState({ custom: updatedCustom });
    }
  };

  onSaveAllClicked = () => {
    if (this.isNameValid(this.state.name)) {
      this.props.onChange(this.state);
    }
  };

  getEditableFields() {
    return [
      {
        name: "Name",
        value: this.props.model.name,
      },
      ...this.props.model.custom,
    ];
  }

  createFieldGroups() {
    const fields = this.getEditableFields().map(field => (
      <EditFieldGroup
        key={field.name}
        name={field.name}
        value={field.value}
        isValid={field.name === "Name" ? this.isNameValid(this.state.name) : true}
        onChange={this.onChangeEditField}
      />
    ));
    return fields;
  }

  isNameValid(name) {
    return !isBlank(name);
  }

  render() {
    return (
      <div className={styles.editView}>
        <div>
          {this.createFieldGroups()}
        </div>
        <div className={styles.actions}>
          <button className={commonStyles.button}
                  onClick={this.props.onCancel}>
            Cancel
          </button>
          <button className={styles.saveBtn}
                  onClick={this.onSaveAllClicked}>
            Save all
          </button>
        </div>
      </div>
    );
  }

}

BulkEditView.propTypes = {
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default BulkEditView;

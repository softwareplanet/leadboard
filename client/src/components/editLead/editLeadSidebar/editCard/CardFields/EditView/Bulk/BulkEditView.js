import React, { Component } from "react";
import styles from "./BulkEditView.css";
import EditFieldGroup from "../EditFieldGroup/EditFieldGroup";
import { isEmpty } from "lodash/fp";

class BulkEditView extends Component {

  state = {
    custom: []
  };

  onChangeEditField(name, value) {
    if (name === "Name") {
      this.setState({ name: value });
    } else {
      let updatedCustom = [...this.state.custom];
      updatedCustom.find(custom => custom.name === name).value = value;
      this.setState({ custom: updatedCustom });
    }
  }

  onSaveAllClicked() {
    let updatedObject = { ...this.state };
    this.props.onChange(updatedObject);
  }

  componentWillMount() {
    this.setState({ ...this.props.toUpdate });
  }

  getEditableFields() {
    let fields = [];
    fields.push({
      name: "Name",
      value: this.props.toUpdate.name
    });
    this.props.toUpdate.custom.forEach(customField => {
      fields.push({
        name: customField.name,
        value: customField.value
      });
    });
    return fields;
  }

  render() {
    const fields = this.getEditableFields().map(field => {
      return <EditFieldGroup
        key={field.name}
        name={field.name}
        value={field.value}
        onChange={this.onChangeEditField.bind(this)}
      />;
    });

    return (
      <div className={styles.editView}>
        <div className={styles.fields}>
          {fields}
        </div>
        <div className={styles.actions}>
          <button className={styles.button}>
            Cancel
          </button>
          <button className={styles.saveBtn}
                  onClick={this.onSaveAllClicked.bind(this)}>
            Save all
          </button>
        </div>
      </div>
    );
  }

}

export default BulkEditView;
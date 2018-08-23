import React, { Component } from "react";
import styles from "./EditCard.css";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";
import BulkEditView from "./CardFields/EditView/BulkEditView/BulkEditView";
import EditButton from "./EditButton/EditButton";

class EditCard extends Component {

  state = {
    isInEditMode: false,
  };

  openEditMode = () => {
    this.setState({ isInEditMode: true });
  };

  closeEditMode = () => {
    this.setState({ isInEditMode: false });
  };

  updateModel = model => {
    this.props.onUpdate(model);
    this.closeEditMode();
  };

  handleMainFieldUpdate = (newValue) => {
    let updatedModel = { ...this.props.model };
    updatedModel.name = newValue;
    this.updateModel(updatedModel);
  };

  handleCustomFieldUpdate = (name, value) => {
    let updatedModel = { ...this.props.model };
    updatedModel.custom = [...this.props.model.custom];
    updatedModel.custom.find(customField => customField.name === name).value = value;
    this.updateModel(updatedModel);
  };

  render() {
    let fields = this.props.model.custom.map((field, index) =>
      <CardField key={index}
                 field={field}
                 onUpdate={this.handleCustomFieldUpdate} />);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>
            {this.props.title}
            </span>
          <EditButton onClick={this.openEditMode} />
        </div>
        {!this.state.isInEditMode &&
        <div>
          <MainField title={this.props.title}
                     value={this.props.model.name}
                     icon={this.props.icon}
                     onUpdate={this.handleMainFieldUpdate} />
          {fields}
        </div>
        }
        {
          this.state.isInEditMode &&
          <BulkEditView model={this.props.model}
                        onCancel={this.closeEditMode}
                        onChange={this.updateModel} />
        }
      </div>
    );
  }
}

export default EditCard;



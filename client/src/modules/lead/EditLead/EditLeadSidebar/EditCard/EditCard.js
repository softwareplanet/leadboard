import React, { Component } from "react";
import styles from "./EditCard.css";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";
import personIcon from "../../../../../img/personIcon.svg";
import organizationIcon from "../../../../../img/organizationIcon.svg";
import editIcon from "../../../../../assets/edit-icon.svg";
import BulkEditView from "./CardFields/EditView/Bulk/BulkEditView";
import axios from "axios";

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

  updateOrganization = (organization) => {
    const organizationId = organization._id;
    delete organization._id;
    axios
      .patch(`/api/organization/${organizationId}`, organization)
      .then(result => {
        this.closeEditMode();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let icon;
    if (this.props.title === "Person") {
      icon = personIcon;
    } else if (this.props.title === "Organization") {
      icon = organizationIcon;
    }
    let fields = this.props.value.custom.map((field) =>
      <CardField fieldValues={Object.values(field)} fieldName={Object.keys(field)}/>);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
                    <span className={styles.titleName}>
                        {this.props.title}
                    </span>
          <button className={styles.editButton} onClick={this.openEditMode}>
            <img className={styles.editIcon} src={editIcon}/>
          </button>
        </div>
        {!this.state.isInEditMode &&
        <div className={styles.fields}>
          <MainField value={this.props.value} icon={icon}/>
          {fields}
        </div>
        }
        {
          this.state.isInEditMode &&
          <BulkEditView toUpdate={this.props.value}
                        onCancel={this.closeEditMode}
                        onChange={(organization) => this.updateOrganization(organization)}/>
        }
      </div>
    );
  }
}

export default EditCard;
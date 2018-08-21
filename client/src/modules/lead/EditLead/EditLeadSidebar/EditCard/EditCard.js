import React, { Component } from "react";
import styles from "./EditCard.css";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";
import personIcon from "../../../../../img/personIcon.svg";
import organizationIcon from "../../../../../img/organizationIcon.svg";
import editIcon from "../../../../../assets/edit-icon.svg";
import BulkEditView from "./CardFields/EditView/Bulk/BulkEditView";
import connect from "react-redux/es/connect/connect";
import { updateOrganization } from "../../../leadActions";

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

  updateEntity = entity => {
    if (this.props.title === "Organization") {
      this.props.updateOrganization(entity);
    }
    this.closeEditMode();
  };

  render() {
    let icon;
    if (this.props.title === "Person") {
      icon = personIcon;
    } else if (this.props.title === "Organization") {
      icon = organizationIcon;
    }
    let fields = this.props.value.custom.map((field) =>
      <CardField key={field._id} fieldValues={Object.values(field)} fieldName={Object.keys(field)}/>);
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
          <MainField title={this.props.title} value={this.props.value} icon={icon}/>
          {fields}
        </div>
        }
        {
          this.state.isInEditMode &&
          <BulkEditView toUpdate={this.props.value}
                        onCancel={this.closeEditMode}
                        onChange={(entity) => this.updateEntity(entity)}/>
        }
      </div>
    );
  }

}

const mapStateToProps = state => ({});

export { EditCard };

export default connect(mapStateToProps, { updateOrganization })(EditCard);

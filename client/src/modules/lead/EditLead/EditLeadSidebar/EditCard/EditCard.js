import React, { Component } from "react";
import styles from "./EditCard.css";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";
import editIcon from "../../../../../assets/edit-icon.svg";
import BulkEditView from "./CardFields/EditView/BulkEditView/BulkEditView";
import { connect } from "react-redux";
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
    let fields = this.props.model.custom.map((field, index) =>
      <CardField key={index}
                 field={field}
                 value={this.props.model}
                 title={this.props.title}/>);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>
            {this.props.title}
            </span>
          <button className={styles.editButton} onClick={this.openEditMode}>
            <img className={styles.editIcon} src={editIcon} alt="Edit icon" />
          </button>
        </div>
        {!this.state.isInEditMode &&
        <div>
          <MainField title={this.props.title} field={this.props.model} icon={this.props.icon} />
          {fields}
        </div>
        }
        {
          this.state.isInEditMode &&
          <BulkEditView toUpdate={this.props.model}
                        onCancel={this.closeEditMode}
                        onChange={(entity) => this.updateEntity(entity)}/>
        }
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export { EditCard };

export default connect(mapStateToProps, { updateOrganization })(EditCard);


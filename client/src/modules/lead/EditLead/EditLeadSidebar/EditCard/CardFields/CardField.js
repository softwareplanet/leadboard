import React, { Component } from "react";
import styles from "./CardField.css";
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { updateOrganization } from "../../../../leadActions";
import SingleEditView from "./EditView/Single/SingleEditView";
import editIcon from "../../../../../../assets/edit-icon.svg";


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

  handleFieldUpdate = (name, value) => {
    if (this.props.title === "Organization") {
      let updatedOrganization = { ...this.props.value };
      updatedOrganization.custom.find(customField => customField.name === name).value = value;
      this.props.updateOrganization(updatedOrganization);
    }
    this.closeEditMode();
  };

  render() {
    let addValue = (
      <span className={styles.addValue}>
        <Link to=' ' onClick={(e) => {
          e.preventDefault();
          this.openEditMode();
        }}>
          + Add value
        </Link>
      </span>
    );
    let value = (
      <div id="fieldValue" className={styles.customFieldValueWrap}>
        <span className={styles.customFieldValue}>
          <span>{this.props.customFieldValue}</span>
        </span>
      </div>
    );
    return (
      <div className={styles.customValue}>
        {
          !this.state.isInEditMode &&

            <div className={styles.customFieldsWrapper}>
              <div id="fieldLabel" className={styles.customFieldLabelWrap}>
                <span className={styles.customFieldLabel}>{this.props.customFieldName}</span>
              </div>
              {this.props.customFieldValue.length === 0 ? addValue : value}
              {
                this.props.customFieldValue.length !== 0 &&
                <button className={styles.editButton} onClick={this.openEditMode}>
                <img className={styles.editIcon} src={editIcon} alt="Edit icon"/>
                </button>
              }
            </div>
        }
        {
          this.state.isInEditMode &&
          <SingleEditView
            fieldName={this.props.customFieldName}
            fieldValue={this.props.customFieldValue}
            onChange={this.handleFieldUpdate}
            onCancel={this.closeEditMode}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export { CardField };

export default connect(mapStateToProps, { updateOrganization })(CardField);
import React, { Component } from "react";
import styles from "./CardField.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateOrganization } from "../../../../leadActions";
import SingleEditView from "./EditView/SingleEditView/SingleEditView";
import editIcon from "../../../../../../assets/edit-icon.svg";
import PropTypes from "prop-types";
import isBlank from "../../../../../../utils/isBlank";

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
    const { name, value } = this.props.field;
    const { isInEditMode } = this.state;

    let valueAdd = (
      <span className={styles.addValue}>
        <Link to=' ' onClick={(e) => {
          e.preventDefault();
          this.openEditMode();
        }}>
          + Add value
        </Link>
      </span>
    );
    let valueShow = (
      <div id="fieldValue" className={styles.customFieldValueWrap}>
        <span className={styles.customFieldValue}>
          <span>{value}</span>
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
              !isBlank(value) &&
              <button className={styles.editButton} onClick={this.openEditMode}>
                <img className={styles.editIcon} src={editIcon} alt="Edit icon"/>
              </button>
            }
          </div>
        }
        {
          this.state.isInEditMode &&
          <SingleEditView
            fieldName={name}
            fieldValue={value}
            onChange={this.handleFieldUpdate}
            onCancel={this.closeEditMode}/>
        }
      </div>
    );
  }
}

CardField.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  title: PropTypes.string,
  field: PropTypes.object,
};

const mapStateToProps = () => ({});

export { CardField };

export default connect(mapStateToProps, { updateOrganization })(CardField);

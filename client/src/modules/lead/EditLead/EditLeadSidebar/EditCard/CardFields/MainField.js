import React, { Component } from "react";
import styles from "./CardField.css";
import { connect } from "react-redux";
import { updateOrganization } from "../../../../leadActions";
import SingleEditView from "./EditView/SingleEditView/SingleEditView";
import PropTypes from "prop-types";

class MainField extends Component {

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
      let updatedOrganization = {...this.props.field};
      updatedOrganization.name = value;
      this.props.updateOrganization(updatedOrganization);
    }
    this.closeEditMode();
  };

  render() {
    const { name } = this.props.field;
    const { isInEditMode } = this.state;
    return (
      <div className={styles.fieldValue}>
        {
          !isInEditMode &&
          <div className={styles.mainFieldValueWrapper}>
          <span className={styles.badge}>
            <img className={styles.icon} src={this.props.icon} alt="Icon"/>
          </span>
            <h3>
              <a className={styles.mainValue}>
                {name}
              </a>
            </h3>
            <button className={styles.buttonRename}
            onClick={this.openEditMode}>
              Rename
            </button>
          </div>
        }
        {
          isInEditMode &&
          <SingleEditView
            fieldName={"Name"}
            fieldValue={name}
            onChange={this.handleFieldUpdate}
            onCancel={this.closeEditMode}/>
        }
      </div>
    );
  }
}

MainField.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  field: PropTypes.object,
  title: PropTypes.string,
};

const mapStateToProps = () => ({});

export { MainField };

export default connect(mapStateToProps, { updateOrganization })(MainField);

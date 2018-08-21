import React, { Component } from "react";
import styles from "./CardField.css";
import { connect } from "react-redux";
import { updateOrganization } from "../../../../leadActions";
import SingleEditView from "./EditView/Single/SingleEditView";
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
      let updatedOrganization = {...this.props.value};
      updatedOrganization.name = value;
      this.props.updateOrganization(updatedOrganization);
    }
    this.closeEditMode();
  };

  render() {
    return (
      <div className={styles.fieldValue}>
        {
          !this.state.isInEditMode &&
          <div className={styles.mainFieldValueWrapper}>
          <span className={styles.badge}>
            <img className={styles.icon} src={this.props.icon}/>
          </span>
            <h3>
              <a className={styles.mainValue}>
                {this.props.value.name}
              </a>

            </h3>
            <button className={styles.buttonRename}
            onClick={this.openEditMode}>
              Rename
            </button>
          </div>
        }
        {
          this.state.isInEditMode &&
          <SingleEditView
            fieldName={"Name"}
            fieldValue={this.props.value.name}
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
  title: PropTypes.string
};

const mapStateToProps = state => ({});

export { MainField };

export default connect(mapStateToProps, { updateOrganization })(MainField);
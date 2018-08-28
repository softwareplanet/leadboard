import React, { Component } from "react";
import styles from "./CardField.css";
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

  handleNameUpdate = (name, value) => {
    this.props.onUpdate(value);
    this.closeEditMode();
  };

  render() {
    const name = this.props.value;
    const { isInEditMode } = this.state;
    return (
      <div>
        {
          !isInEditMode &&
          <div className={styles.fieldValue}>
            <div className={styles.mainFieldValueWrapper}>
          <span className={styles.badge}>
            <img className={styles.icon} src={this.props.icon} alt="Icon" />
          </span>
              <h3>
              <span className={styles.mainValue}>
                {name}
              </span>
              </h3>
              <button className={styles.buttonRename}
                      onClick={this.openEditMode}>
                Rename
              </button>
            </div>
          </div>
        }
        {
          isInEditMode &&
          <div className={styles.fieldEditValue}>
            <SingleEditView
              fieldName={"Name"}
              fieldValue={name}
              onChange={this.handleNameUpdate}
              onCancel={this.closeEditMode} />
          </div>
        }
      </div>


    );
  }
}

MainField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  onUpdate: PropTypes.func,
};

export default MainField;


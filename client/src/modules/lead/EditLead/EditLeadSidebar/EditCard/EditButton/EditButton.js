import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./EditButton.css";
import editIcon from "../../../../../../assets/edit-icon.svg";

class EditButton extends Component {

  render() {
    return (
      <button
        className={this.props.style ? this.props.style : styles.editButton}
        onClick={this.props.onClick}>
        <img className={styles.editIcon} src={editIcon} alt="Edit icon" />
      </button>
    );
  }
}

EditButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.string,
};

export default EditButton;
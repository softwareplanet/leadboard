import React, { Component } from "react";
import styles from "./EditFieldGroup.css";
import PropTypes from "prop-types";

class EditFieldGroup extends Component {

  onInputChange(e){
    this.props.onChange(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>{this.props.name}</span>
        </div>
        <div className={styles.inputWrapper}>
          <input type="text"
                 name={this.props.name}
                 className={styles.input}
                 defaultValue={this.props.value}
                 onChange={(e) => this.onInputChange(e)}/>
        </div>
      </div>
    );
  }

}

EditFieldGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default EditFieldGroup;
import React, { Component } from "react";
import styles from "./EditFieldGroup.css";

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
                 onChange={(e) => this.onInputChange.bind(this, e)}/>
        </div>
      </div>
    );
  }

}

export default EditFieldGroup;
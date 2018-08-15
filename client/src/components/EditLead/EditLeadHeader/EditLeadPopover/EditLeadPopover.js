import React, { Component } from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import styles from "./EditLeadPopover.css";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popover
        className={styles.popover}
        placement="bottom"
        target={this.props.target}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <PopoverHeader>{this.props.title}</PopoverHeader>
        <PopoverBody className={styles.container}>
          <div className={styles.inputContainer}>
            <input className={styles.input} defaultValue={this.props.data} />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.buttons}>
              <button onChange={() => this.props.onSave()} className={styles.buttonSave}>
                Save
              </button>
              <button className={styles.button}>Cancel</button>
            </div>
          </div>
        </PopoverBody>
      </Popover>
    );
  }

  componentDidMount() {}
}

export default EditLeadPopover;

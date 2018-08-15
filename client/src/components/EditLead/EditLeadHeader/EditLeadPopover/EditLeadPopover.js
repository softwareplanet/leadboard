import React, { Component } from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import styles from "./EditLeadPopover.css";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
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
            <input onChange={this.onChange} className={styles.input} defaultValue={this.props.data} />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.buttons}>
              <button onClick={() => this.props.onSave(this.state.name)} className={styles.buttonSave}>
                Save
              </button>
              <button onClick={this.props.onCancel} className={styles.button}>
                Cancel
              </button>
            </div>
          </div>
        </PopoverBody>
      </Popover>
    );
  }

  onChange(e) {
    this.setState({
      ...this.state,
      name: e.target.value
    });
  }

  componentDidMount() {
    this.setState({
      name: this.props.data
    });
  }
}

export default EditLeadPopover;

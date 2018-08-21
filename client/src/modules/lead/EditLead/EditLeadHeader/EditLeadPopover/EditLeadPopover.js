import React, { Component } from "react";
import { Popover, Card, CardBody, CardFooter } from "reactstrap";
import styles from "./EditLeadPopover.css";
import { flow, isEmpty, trim } from "lodash/fp";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        value: ""
      }
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.value,
      errors:{
        value: ""
      }
    })
  }

  render() {
    return (
      <Popover
        className={styles.popover}
        placement="bottom-start"
        target={this.props.target}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <Card>
          <div className={styles.header}>{this.props.title}</div>
          <CardBody className={styles.container}>
            <div className={styles.inputContainer}>
              <input 
              onChange={this.onChange} 
              className={this.isBlank(this.state.errors.value) ? styles.input : styles.invalidInput} 
              defaultValue={this.props.value} />
            </div>
          </CardBody>
          <CardFooter className={styles.buttons}>
            <button onClick={() => this.onSave()} className={styles.buttonSave}>
              Save
            </button>
            <button onClick={this.props.onCancel} className={styles.button}>
              Cancel
            </button>
          </CardFooter>
        </Card>
      </Popover>
    );
  }

  isBlank = flow(
    trim,
    isEmpty
  );

  onSave = () => {
    let { errors } = this.state;
    if (this.isBlank(this.state.value)){
      errors.value = "Value must be not empty"
      this.setState(errors)
    }
    else {
      errors.value = ""
      this.setState(errors)
      this.props.onSave(this.state.value)
    }
  }

  onChange = e => {
    this.setState({
      ...this.state,
      value: e.target.value
    });
  };
}

export default EditLeadPopover;

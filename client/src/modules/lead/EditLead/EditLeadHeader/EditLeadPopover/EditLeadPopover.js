import React, { Component } from "react";
import { Popover, Card, CardBody, CardFooter } from "reactstrap";
import styles from "./EditLeadPopover.css";
import isBlank from "../../../../../utils/isBlank"

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
      error: ""
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
                className={isBlank(this.state.error) ? styles.input : styles.invalidInput} 
                defaultValue={this.props.value} />
            </div>
          </CardBody>
          <CardFooter className={styles.buttons}>
            <button onClick={this.onSave} className={styles.buttonSave}>
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

  onSave = () => {
    let error = {}
    if (isBlank(this.state.value)){
      error = "Value must be not empty"
      this.setState({ error })
    }
    else {
      error = ""
      this.setState({ error })
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

import React, { Component } from "react";
import { Popover, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import styles from "./EditLeadPopover.css";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <input onChange={this.onChange} className={styles.input} defaultValue={this.props.value} />
            </div>
          </CardBody>
          <CardFooter className={styles.buttons}>
            <button onClick={() => this.props.onSave(this.state.name)} className={styles.buttonSave}>
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

  onChange = e => {
    this.setState({
      ...this.state,
      name: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      name: this.props.value
    });
  }
}

export default EditLeadPopover;

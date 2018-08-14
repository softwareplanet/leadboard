import React, { Component } from "react";
import { Popover, PopoverBody } from "reactstrap";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popover placement="bottom" target={this.props.target} isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <PopoverBody>
          <input defaultValue={this.props.data} />
          <button className={"btn"}>Cancel</button>
          <button onChange={() => this.props.onSave()} className={"btm btn-success"}>
            Save
          </button>
        </PopoverBody>
      </Popover>
    );
  }

  componentDidMount() {}
}

export default EditLeadPopover;

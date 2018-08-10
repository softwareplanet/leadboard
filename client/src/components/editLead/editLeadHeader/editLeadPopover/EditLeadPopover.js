import React, { Component } from "react";
import { Popover } from "react-bootstrap";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Popover
        placement={'bottom'}
        title={this.props.title}
        >
          <input defaultValue={this.props.data}/>
          <button className={'btn'}>Cancel</button>
          <button onChange={() => this.props.onSave()} className={'btm btn-success'}>Save</button>
        </Popover>
      </div>
    );
  }

  componentDidMount() {
  }
}

export default EditLeadPopover;
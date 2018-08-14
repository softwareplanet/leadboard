import React, { Component } from "react";
import { Popover } from "react-bootstrap";

class EditLeadPopover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Popover
          id="popover-trigger-click-root-close"
          placement={'bottom'}
          title={this.props.title}
          container={this}
        >
          <input defaultValue={this.props.data}/>
          <button className={'btn'}>Cancel</button>
          <button onChange={() => this.props.onSave()} className={'btm btn-success'}>Save</button>
        </Popover>
    );
  }

  componentDidMount() {
  }
}

export default EditLeadPopover;
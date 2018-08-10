import React, { Component } from "react";
import "./EditLeadStage.css";

export default class EditLeadStage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let width = {
      width : `${(100/this.props.stages.length)-1}%`
    };

    return (
      <li style={width}>
        {this.props.name ? this.props.name : null}
      </li>
    );
  }
}

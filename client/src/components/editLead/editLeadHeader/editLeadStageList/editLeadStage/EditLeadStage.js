import React, { Component } from "react";
import "./EditLeadStage.css";

export default class EditLeadStage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.stage}
      </li>
    );
  }
}

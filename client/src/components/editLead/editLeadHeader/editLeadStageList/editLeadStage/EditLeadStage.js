import React, { Component } from "react";
import "./EditLeadStage.css";

export default class EditLeadStage extends Component {
  constructor(props) {
    super(props);
  }

  onStageClick() {
    let stage = {};
    stage._id = this.props._id;
    stage.funnel = this.props.funnel;
    stage.name = this.props.name;
    stage.order = this.props.order;
    stage.timestamp = this.props.timestamp;
    stage.__v = this.props.__v;
    this.props.onStageClick(stage);
  }

  render() {
    let width = {
      width: `${100 / this.props.stages.length - 1}%`
    };

    return (
      <li
        onClick={() => this.onStageClick()}
        className={this.props.active ? "active" : ""}
        data-toggle="tooltip"
        data-placement="bottom"
        title={this.props.name}
        style={width}
      />
    );
  }

  getDays(fistDate, secondDate, oneDay) {
    return Math.round(Math.abs((secondDate.getTime() - fistDate.getTime()) / oneDay));
  }
}

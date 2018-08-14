import React, { Component } from "react";
import styles from "./EditLeadStage.css";
import classNames from "classnames";

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
        className={classNames(
          styles.li,
          { [styles.active]: this.props.active },
          { [styles.lost]: this.props.status === "Lost" }
        )}
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

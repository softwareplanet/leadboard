import React, { Component } from "react";
import styles from "./EditLeadStage.css";
import classNames from "classnames";

export default class EditLeadStage extends Component {
  constructor(props) {
    super(props);
  }

  onStageClick() {
    let stage = this.props.stage;
    this.props.onStageClick(stage);
  }

  render() {
    let width = {
      width: `${100 / this.props.stages.length - 1}%`
    };

    return (
      <li
        onClick={() => (this.props.status !== "Lost" ? this.onStageClick() : null)}
        className={classNames(
          styles.li,
          { [styles.active]: this.props.active },
          { [styles.lost]: this.props.status === "Lost" }
        )}
        data-toggle="tooltip"
        data-placement="bottom"
        title={this.props.stage.name}
        style={width}
      />
    );
  }
}

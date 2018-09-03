import * as React from 'react';
import * as styles from "./EditLeadStage.css";
import classNames from "classnames";
import { LOST } from "../../../../../../constants";

export interface Props {
  onStageClick(stage: any): any;
  stage: any;
  stages: any [];
  status: string;
  active: true;
  isFirst: boolean;
}

export default class EditLeadStage extends React.Component<Props, object> {

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
        onClick={() => (this.props.status !== LOST ? this.onStageClick() : null)}
        className={classNames(
          { [styles.active]: this.props.active },
          { [styles.lost]: this.props.status === LOST },
          `${this.props.isFirst ? styles.liFirst : styles.li}`
        )}
        data-tip={this.props.stage.name}
        style={width}
      />
    );
  }
}

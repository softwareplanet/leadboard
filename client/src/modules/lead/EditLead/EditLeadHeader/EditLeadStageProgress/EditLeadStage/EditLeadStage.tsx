import * as React from 'react';
import * as styles from './EditLeadStage.css';
import classNames from 'classnames';
import { LOST } from '../../../../../../constants';
import Stage from '../../../../../../models/Stage';

export interface Props {
  stage: Stage;
  stages: Stage [];
  status: string;
  active: boolean;
  isFirst: boolean;
  onStageClick(stage: Stage): void;
}

export default class EditLeadStage extends React.Component<Props, object> {

  public render() {
    const width = {
      width: `${100 / this.props.stages.length - 1}%`
    };

    return (
      <li
        onClick={() => this.props.status !== LOST ? this.onStageClick() : null}
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

  private onStageClick = () => {
    const stage = this.props.stage;
    this.props.onStageClick(stage);
  }
}

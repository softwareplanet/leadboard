import * as React from 'react';
import Stage from '../../../../../../models/Stage';
import * as styles from './StageView.css';

interface Props {
  stage: Stage;
}

export default class StageView extends React.Component<Props> {

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.stageName}>
            {this.props.stage.name}
          </span>
        </div>
    </div>
  );
  }
}

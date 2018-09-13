import * as React from 'react';
import Stage from '../../../../../../models/Stage';
import * as styles from './StageView.css'

interface Props {
  stage: Stage;
}

export default class StageView extends React.Component<Props> {

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <a className={styles.stageName}>
            <span>
              {this.props.stage.name}
            </span>
          </a>
        </div>
    </div>
  )
  }
}

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
          <a>
            {this.props.stage.name}
          </a>
          <small>

          </small>
        </div>
    </div>
  )
  }
}

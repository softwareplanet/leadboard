import * as React from 'react';
import * as styles from './Stages.css'
import StageView from './StageView/StageView';

export default class Stages extends React.Component {

  public render() {
    return (
      <div className={styles.content}>
          <div className={styles.stagesList}>
              <StageView/>
              <StageView/>
          </div>
      </div>
    )
  }
}

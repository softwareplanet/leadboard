import * as React from 'react';
import Stages from './Stages/Stages';
import * as styles from './Funnel.css';

interface Props {
  funnel: Funnel;
}

export default class Funnel extends React.Component<Props> {

  public render() {
    return (
      <div className={styles.funnel}>
        <Stages />
      </div>
    )
  }
}

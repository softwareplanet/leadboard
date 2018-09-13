import * as React from 'react';
import FunnelModel from '../../../../models/Funnel';
import * as styles from './Funnel.css';
import Stages from './Stages/Stages';

interface Props {
  funnel?: FunnelModel;
}

export default class Funnel extends React.Component<Props> {

  public render() {
    return (
      <div className={styles.funnel}>
        {this.props.funnel ? this.props.funnel.name : ''}
        <Stages />
      </div>
    )
  }
}

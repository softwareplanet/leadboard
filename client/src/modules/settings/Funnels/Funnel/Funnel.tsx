import * as React from 'react';
import FunnelModel from '../../../../models/Funnel';
import * as styles from './Funnel.css';
import Stages from './Stages/Stages';

interface Props {
  funnel: FunnelModel;
}

export default class Funnel extends React.Component<Props> {

  public render() {

    return (
      <div className={styles.funnel}>
        <Stages funnelId={'5b97a9bb8ef7eb47231396a6'}/>
      </div>
    )
  }
}

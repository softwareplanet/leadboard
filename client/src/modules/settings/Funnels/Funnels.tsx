import * as React from 'react';
import { connect } from 'react-redux';
import Stage from '../../../models/Stage';
import Funnel from './Funnel/Funnel';
import * as styles from './Funnels.css'

interface Props {
  funnels: Funnel[];
  selectedFunnel: Funnel;
  stages: Stage[];
}

class Funnels extends React.Component<Props> {
  public render() {
    return (
      <div>
        <h1 className={styles.heading}>Customize sales stages</h1>
        <Funnel funnel={this.props.selectedFunnel}/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  funnels: state.funnels,
  selectedFunnel: state.selectedFunnel,
  stages: state.stages,
});

export default connect(mapStateToProps)(Funnels)

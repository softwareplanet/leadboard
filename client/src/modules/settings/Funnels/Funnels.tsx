import * as React from 'react';
import { connect } from 'react-redux';
import Funnel from './Funnel/Funnel';
import Stage from '../../../models/Stage';

interface Props {
  funnels: Funnel[];
  selectedFunnel: Funnel;
  stages: Stage[];
}

class Funnels extends React.Component<Props> {
  public render() {
    return (
      <div>
        <h1>Customize sales stages</h1>
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

import * as React from 'react';
import { connect } from 'react-redux';

class Pipelines extends React.Component {
  public render() {
    return (
      <div>Pipelines</div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  funnels: state.funnels,
  selectedFunnel: state.selectedFunnel,
  stages: state.stages,
});

export default connect(mapStateToProps)(Pipelines)

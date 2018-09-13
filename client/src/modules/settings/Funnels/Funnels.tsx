import * as React from 'react';
import { connect } from 'react-redux';

class Funnels extends React.Component {
  public render() {
    return (
      <div>Customize sales stages</div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  funnels: state.funnels,
  selectedFunnel: state.selectedFunnel,
  stages: state.stages,
});

export default connect(mapStateToProps)(Funnels)

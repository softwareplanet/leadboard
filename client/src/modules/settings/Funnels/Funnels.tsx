import * as React from 'react';
import { connect } from 'react-redux';
import FunnelModel from '../../../models/Funnel';
import { loadFunnels } from '../settingActions';
import Funnel from './Funnel/Funnel';
import * as styles from './Funnels.css'

interface Props {
  funnels: FunnelModel[];
  selectedFunnel: FunnelModel;
  domainId: string;

  loadFunnels(): void;
}

class Funnels extends React.Component<Props> {

  public render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Customize sales stages</h1>
        <Funnel funnel={this.props.funnels[0]}/>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.domainId && this.props.funnels.length === 0) {
      this.props.loadFunnels();
    }
  }
}

const mapStateToProps = (state: any) => ({
  domainId: state.auth.domainid,
  funnels: state.settings.funnels,
  selectedFunnel: state.settings.selectedFunnel,
});

export default connect(mapStateToProps, { loadFunnels })(Funnels)
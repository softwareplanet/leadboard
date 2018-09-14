import * as React from 'react';
import { connect } from 'react-redux';
import FunnelModel from '../../../models/Funnel';
import { loadFunnels, selectFunnel } from '../settingActions';
import AddPipelineModal from './AddPipelineModal/AddPipelineModal';
import Funnel from './Funnel/Funnel';
import * as styles from './Funnels.css'

interface Props {
  funnels: FunnelModel[];
  selectedFunnel: FunnelModel;
  domainId: string;

  loadFunnels(): void;
  selectFunnel(funnel: FunnelModel): void;
}

interface State {
  isModalOpen: boolean;
}

class Funnels extends React.Component<Props, State> {
  public state: State = {
    isModalOpen: false,
  };

  public render() {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.heading}>Customize sales stages</h1>
          <button className={styles.addPipelineButton} onClick={this.onClick}><span>Add new pipeline</span></button>
          <AddPipelineModal
            isModalOpen={this.state.isModalOpen}
            onCancelClick={this.onCancelClick}
          />
        </div>
        <div className={styles.tabs}>
          {this.createTabs(this.props.funnels)}
        </div>
        <Funnel funnel={this.props.selectedFunnel}/>
      </div>
    )
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.domainId && this.props.funnels.length === 0) {
      this.props.loadFunnels();
    }
  }

  private onClick = () => {
    this.setState({ isModalOpen: true });
  };

  private onCancelClick = () => {
    this.setState({ isModalOpen: false });
  };


  private createTabs = (funnels: FunnelModel[]) => {
    return funnels.map((funnel: FunnelModel) => (
      <button
        key={`${funnel.name}`}
        className={this.props.selectedFunnel._id === funnel._id ? styles.tabActive : styles.tab}
        onClick={this.props.selectFunnel.bind(this, funnel) }
      >
        {funnel.name}
        <span className={this.props.selectedFunnel._id === funnel._id ? styles.tabBadgeActive : styles.tabBadge}>1</span>
      </button>
    ));
  };
}

const mapStateToProps = (state: any) => ({
  domainId: state.auth.domainid,
  funnels: state.settings.funnels,
  selectedFunnel: state.settings.selectedFunnel,
});

export default connect(mapStateToProps, { loadFunnels, selectFunnel })(Funnels)

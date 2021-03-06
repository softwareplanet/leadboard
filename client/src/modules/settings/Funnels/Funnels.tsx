import * as React from 'react';
import { connect } from 'react-redux';
import FunnelModel from '../../../models/Funnel';
import { createFunnel, loadFunnels, selectFunnel } from '../settingActions';
import Funnel from './Funnel/Funnel';
import NameModal from './Funnel/NameModal/NameModal';
import * as styles from './Funnels.css';

interface Props {
  funnels: FunnelModel[];
  selectedFunnel: FunnelModel;
  domainId: string;

  loadFunnels(): void;

  selectFunnel(funnel: FunnelModel): void;

  createFunnel(name: string): void;
}

interface State {
  isModalOpen: boolean;
  isInputEmpty: boolean;
}

class Funnels extends React.Component<Props, State> {
  public state: State = {
    isInputEmpty: false,
    isModalOpen: false,
  };

  public render() {
    return (
      <div className={styles.content}>
        <div>
          <h1 className={styles.heading}>Customize sales stages</h1>
          <button className={styles.addPipelineButton} onClick={this.onClick}><span>Add new pipeline</span></button>
          <NameModal 
            isModalOpen={this.state.isModalOpen}
            heading={'Add Pipeline'}
            onSave={this.onSaveButtonClick}
            onCancel={this.onCancelClick}
          />
        </div>
        <div className={styles.tabs}>
          {this.createTabs(this.props.funnels)}
        </div>
        <Funnel funnel={this.props.selectedFunnel} />
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.domainId && this.props.funnels.length === 0) {
      this.props.loadFunnels();
    }
  }

  public componentDidMount() {
    this.props.loadFunnels();
  }

  private onClick = () => {
    this.setState({ isModalOpen: true });
  }

  private onCancelClick = () => {
    this.setState({ isModalOpen: false });
  }

  private createTabs = (funnels: FunnelModel[]) => {
    return funnels.map((funnel: FunnelModel) => (
      <button
        key={funnel._id}
        className={this.props.selectedFunnel._id === funnel._id ? styles.tabActive : styles.tab}
        onClick={this.props.selectFunnel.bind(this, funnel)}
      >
        {funnel.name}
      </button>
    ));
  }

  private onSaveButtonClick = (name: string) => {
    this.props.createFunnel(name);
    this.setState({ isModalOpen: false });
  }
}

const mapStateToProps = (state: any) => ({
  domainId: state.auth.domainid,
  funnels: state.settings.funnels,
  selectedFunnel: state.settings.selectedFunnel,
});

export { Funnels };

export default connect(mapStateToProps, { loadFunnels, selectFunnel, createFunnel })(Funnels);

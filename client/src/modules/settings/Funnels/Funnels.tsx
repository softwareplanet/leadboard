import * as React from 'react';
import { connect } from 'react-redux';
import FunnelModel from '../../../models/Funnel';
import isBlank from '../../../utils/isBlank';
import { createFunnel, loadFunnels } from '../settingActions';
import AddPipelineModal from './AddPipelineModal/AddPipelineModal';
import Funnel from './Funnel/Funnel';
import * as styles from './Funnels.css';

interface Props {
  funnels: FunnelModel[];
  selectedFunnel: FunnelModel;
  domainId: string;

  loadFunnels(): void;

  createFunnel(name: string): void;
}

interface State {
  isModalOpen: boolean;
  isInputEmpty: boolean;
  inputValue: string;
}

class Funnels extends React.Component<Props, State> {
  public state: State = {
    isModalOpen: false,
    isInputEmpty: false,
    inputValue: '',
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
            onInputChange={this.onInputChange}
            onInputBlur={this.onInputBlur}
            isInputEmpty={this.state.isInputEmpty}
            inputValue={this.state.inputValue}
            onSaveButtonClick={this.onSaveButtonClick}
          />
        </div>
        <Funnel funnel={this.props.funnels[0]} />
      </div>
    );
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

  private onInputBlur = () => {
    this.setState({ isInputEmpty: isBlank(this.state.inputValue) });
  };

  private onInputChange = (event: any) => {
    this.setState({ inputValue: event.target.value });
  };

  private onSaveButtonClick = (event: any) => {
    event.preventDefault();
    this.props.createFunnel(this.state.inputValue);
    this.setState({ isModalOpen: false });
  };
}

const mapStateToProps = (state: any) => ({
  domainId: state.auth.domainid,
  funnels: state.settings.funnels,
  selectedFunnel: state.settings.selectedFunnel,
});

export default connect(mapStateToProps, { loadFunnels, createFunnel })(Funnels);

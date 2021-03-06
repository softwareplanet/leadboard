import * as React from 'react';
import { connect } from 'react-redux';
import Funnel from '../../../../../models/Funnel';
import Stage from '../../../../../models/Stage';
import { loadSettingsStages, updateStageName } from '../../../settingActions';
import NameModal from '../NameModal/NameModal';
import * as styles from './Stages.css';
import StageView from './StageView/StageView';

interface Props {
  stages: Stage[];
  selectedFunnel: Funnel;

  loadSettingsStages(funnelId: string): void;

  updateStageName(stageIs: string, name: string): void;
}

interface State {
  isModalOpen: boolean;
  clickedStage: any;
}

class Stages extends React.Component<Props, State> {
  public state: State = {
    clickedStage: undefined,
    isModalOpen: false,
  };

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedFunnel._id !== this.props.selectedFunnel._id){
      this.props.loadSettingsStages(nextProps.selectedFunnel._id);
    }
  }

  public componentDidMount() {
    if (this.props.selectedFunnel._id) {
      this.props.loadSettingsStages(this.props.selectedFunnel._id);
    }
  }

  public render() {
    return (
      <div className={styles.content}>
        <ul className={styles.stagesList}>
          {this.props.stages.map(stage => {
            return (
              <li onClick={() => this.openModal(stage)} key={stage._id}>
                <StageView stage={stage} />
              </li>
            );
          })}
        </ul>
        <NameModal 
          isModalOpen={this.state.isModalOpen} 
          heading="Edit stage"
          onCancel={this.onEditStageCancel} 
          onSave={this.onEditStageSave} 
          id={this.state.clickedStage ? this.state.clickedStage._id : null}
          name={this.state.clickedStage ? this.state.clickedStage.name : null}
        />
      </div>
    );
  }

  private onEditStageSave = (name: string, id: string) => {
    this.props.updateStageName(id, name);
    this.setState({
      isModalOpen: false,
    });
  }

  private onEditStageCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  private openModal = (stage: any) => {
    this.setState({
      clickedStage: stage,
      isModalOpen: true,
    });
  }
}

const mapStateToProps = (state: any) => ({
  selectedFunnel: state.settings.selectedFunnel,
  stages: state.settings.stages,
});

export { Stages };

export default connect(mapStateToProps, { loadSettingsStages, updateStageName })(Stages);

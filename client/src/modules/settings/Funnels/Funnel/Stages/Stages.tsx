import * as React from 'react';
import { connect } from 'react-redux';
import Funnel from '../../../../../models/Funnel';
import Stage from '../../../../../models/Stage';
import { loadStages, updateStageName } from '../../../settingActions';
import AddStageModal from '../AddStageModal/AddStageModal';
import * as styles from './Stages.css';
import StageView from './StageView/StageView';

interface Props {
  stages: Stage[];
  selectedFunnel: Funnel;

  loadStages(funnelId: string): void;

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
      this.props.loadStages(nextProps.selectedFunnel._id);
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
        <AddStageModal 
          isModalOpen={this.state.isModalOpen} 
          onCancel={this.onEditStageCancel} 
          onSave={this.onEditStageSave} 
          stage={this.state.clickedStage}
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

export default connect(mapStateToProps, { loadStages, updateStageName })(Stages);

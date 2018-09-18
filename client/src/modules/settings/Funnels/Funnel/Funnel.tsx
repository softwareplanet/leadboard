import * as React from 'react';
import { connect } from 'react-redux';
import FunnelModel from '../../../../models/Funnel';
import Stage from '../../../../models/Stage';
import { createStage, updateFunnel } from '../../settingActions';
import * as styles from './Funnel.css';
import NameModal from './NameModal/NameModal';
import Stages from './Stages/Stages';

interface Props {
  funnel?: FunnelModel;
  stages?: Stage[];

  updateFunnel(funnelId: string, funnel: any): void;

  createStage (stage: any): void;
}

interface State {
  isEditNameModalOpen: boolean;
  isAddStageModalOpen: boolean;
}


class Funnel extends React.Component<Props, State> {
  public state: State = {
    isEditNameModalOpen: false,
    isAddStageModalOpen: false,
  };

  public render() {
    return (
      <div className={styles.funnel}>
        <div>
          <div className={styles.heading}>
            <div className={styles.mainHeading}>
              <div className={styles.name}>{this.props.funnel ? this.props.funnel.name : ''}</div>
              <div onClick={this.openEditNameModal} className={styles.edit}>Edit</div>
            </div>
            <button onClick={this.openAddStageModal} className={styles.addButton}>Add new stage</button>
          </div>
          <NameModal 
            isModalOpen={this.state.isEditNameModalOpen}
            onSave={this.onEditNameSave}
            onCancel={this.onEditNameCancel}
            heading="Edit funnel"
            name={this.props.funnel ? this.props.funnel.name : ''}
          />
          <NameModal 
            isModalOpen={this.state.isAddStageModalOpen} 
            heading="Add stage"
            onSave={this.onAddNewStageSave} 
            onCancel={this.onAddNewStageCancel}
          />
        </div> 
        <Stages />
      </div>
    );
  }

  private openEditNameModal = () => {
    if (this.props.funnel) {
      this.setState({
        isEditNameModalOpen: true,
      });
    }
  }

  private openAddStageModal = () => {
    this.setState({
      isAddStageModalOpen: true,
    });
  }

  private onEditNameSave = (name: string) => {
    if(this.props.funnel){
      this.props.updateFunnel(this.props.funnel._id, { name });
      this.setState({
        isEditNameModalOpen: false,
      });
    }
  }

  private onEditNameCancel = () => {
    this.setState({
      ...this.state,
      isEditNameModalOpen: false,
    });
  }

  private onAddNewStageSave = (name: string) => {
    const stage: any = {
      funnel: this.props.funnel ? this.props.funnel._id : null,
      name,
      order: this.props.stages ? this.props.stages.length + 1 : null,
    };
    this.props.createStage(stage);
    this.setState({
      ...this.state,
      isAddStageModalOpen: false,
    });
  }

  private onAddNewStageCancel = () => {
    this.setState({
      ...this.state,
      isAddStageModalOpen: false,
    });
  }
}

const mapStateToProps = (state: any) => ({
  stages: state.settings.stages,
});

export { Funnel };

export default connect(mapStateToProps, { updateFunnel, createStage })(Funnel);

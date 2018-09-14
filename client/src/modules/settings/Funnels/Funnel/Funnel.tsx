import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import FunnelModel from '../../../../models/Funnel';
import isBlank from '../../../../utils/isBlank';
import { updateFunnel, createStage } from '../../settingActions';
import * as styles from './Funnel.css';
import Stages from './Stages/Stages';
import AddStageModal from './AddStageModal/AddStageModal';
import Stage from '../../../../models/Stage';

interface Props {
  funnel?: FunnelModel;
  stages?: Stage[];
  updateFunnel(funnelId: string, funnel: any): void;

  createStage (stage: any): void;
}

interface State {
  name: string;
  isEditNameModalOpen: boolean;
  isAddStageModalOpen: boolean;
}

const customStyles = {
  content: {
    top: 100,
    right: 'auto',
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, 0)',
    margin: '0',
    padding: '0',
    width: '400px',
    borderRadius: '0 0 2px 2px',
    border: '1px solid #e5e5e5',
    boxShadow: '0 10px 45px rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
  },
};

class Funnel extends React.Component<Props, State> {
  public state: State = {
    isEditNameModalOpen: false,
    isAddStageModalOpen: false,
    name: '',
  }

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
          <Modal 
            isOpen={this.state.isEditNameModalOpen}
            style={customStyles}
          >
            <h1 className={styles.modalHeader}>Edit</h1>
            <div className={styles.modalContent}>
              <div className={styles.nameInputContainer}>
                <div className={styles.inputContainer}>
                  <input 
                    className={styles.input} 
                    type="text" 
                    value={this.state.name}
                    onChange={this.onNameChange}
                  />
                  <div className={styles.modalButtons}>
                    <button 
                      disabled={isBlank(this.state.name)} 
                      onClick={this.onEditNameSave} 
                      className={styles.save}
                    >
                      Save
                    </button>
                    <button onClick={this.onEditNameCancel} className={styles.cancel}>Cancel</button>  
                  </div>
                </div>
                <div>Title of the funnel</div>
              </div>
            </div>
          </Modal>
          <AddStageModal 
            isModalOpen={this.state.isAddStageModalOpen} 
            onSave={this.onAddNewStageSave} 
            onCancel={this.onAddNewStageCancel}
          />
        </div> 
        <Stages />
      </div>
    )
  }

  private openEditNameModal = () => {
    if (this.props.funnel) {
      this.setState({
        isEditNameModalOpen: true,
        name: this.props.funnel.name,
      })
    }
  }

  private openAddStageModal = () => {
    this.setState({
      isAddStageModalOpen: true,
    })
  }

  private onNameChange = (e: any) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    })
  }

  private onEditNameSave = () => {
    if(this.props.funnel){
      this.props.updateFunnel(this.props.funnel._id, { name: this.state.name })
      this.setState({
        ...this.state,
        isEditNameModalOpen: false,
      })
    }
  }

  private onEditNameCancel = () => {
    this.setState({
      ...this.state,
      isEditNameModalOpen: false,
    })
  }

  private onAddNewStageSave = (name: string) => {
    let stage: any = {
      funnel: this.props.funnel ? this.props.funnel._id : null,
      name,
      order: this.props.stages ? this.props.stages.length+1 : null,
    }
    this.props.createStage(stage);
    this.setState({
      ...this.state,
      isAddStageModalOpen: false,
    })
  }

  private onAddNewStageCancel = () => {
    this.setState({
      ...this.state,
      isAddStageModalOpen: false,
    })
  }
}

const mapStateToProps = (state: any) => ({
  stages: state.settings.stages,
})

export { Funnel }

export default connect(mapStateToProps, { updateFunnel, createStage })(Funnel)
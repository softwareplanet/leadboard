import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import FunnelModel from '../../../../models/Funnel';
import isBlank from '../../../../utils/isBlank';
import { updateFunnel } from '../../settingActions';
import * as styles from './Funnel.css';
import Stages from './Stages/Stages';

interface Props {
  funnel?: FunnelModel;

  updateFunnel(funnelId: string, funnel: any): void;
}

interface State {
  name: string;
  isModalOpen: boolean;
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
    isModalOpen: false,
    name: '',
  }

  public render() {

    return (
      <div className={styles.funnel}>
        <div>
          <div className={styles.heading}>
            <div className={styles.name}>{this.props.funnel ? this.props.funnel.name : ''}</div>
            <div onClick={this.openModal} className={styles.edit}>Edit</div>
          </div>
          <Modal 
            isOpen={this.state.isModalOpen}
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
                      onClick={this.save} 
                      className={styles.save}
                    >
                      Save
                    </button>
                    <button onClick={this.cancel} className={styles.cancel}>Cancel</button>  
                  </div>
                </div>
                <div>Title of the funnel</div>
              </div>
            </div>
          </Modal>
        </div> 
        <Stages />
      </div>
    )
  }

  private openModal = () => {
    if (this.props.funnel) {
      this.setState({
        isModalOpen: true,
        name: this.props.funnel.name,
      })
    }
  }

  private onNameChange = (e: any) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    })
  }

  private save = () => {
    if(this.props.funnel){
      this.props.updateFunnel(this.props.funnel._id, {name: this.state.name})
      this.setState({
        ...this.state,
        isModalOpen: false,
      })
    }
  }

  private cancel = () => {
    this.setState({
      ...this.state,
      isModalOpen: false,
    })
  }
}

const mapStateToProps = (state: any) => ({})

export { Funnel }

export default connect(mapStateToProps, { updateFunnel })(Funnel)
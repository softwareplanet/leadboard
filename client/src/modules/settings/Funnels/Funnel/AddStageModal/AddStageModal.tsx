import * as React from 'react'
import * as Modal from 'react-modal';
import Stage from '../../../../../models/Stage';
import isBlank from '../../../../../utils/isBlank';
import * as styles from './AddStageModal.css'

interface Props {
  isModalOpen: boolean;
  stage?: Stage;

  onSave(name: string, id?: string): void;

  onCancel(): void;
}

interface State {
  name: string;
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

export default class AddStageModal extends React.Component<Props, State> {
  public state: State = {
    name: '',
  }
  
  public render() {
    return (
      <Modal 
        isOpen={this.props.isModalOpen}
        style={customStyles}
      >
        <h1 className={styles.modalHeader}>Add stage</h1>
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
                  onClick={this.onSave} 
                  className={styles.save}
                >
                  Save
                </button>
                <button onClick={this.props.onCancel} className={styles.cancel}>Cancel</button>  
              </div>
            </div>
            <div>Stage name</div>
          </div>
        </div>
      </Modal>
    )
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.stage) {
      this.setState({
        name: nextProps.stage.name,
      })
    }
  }

  private onSave = () => {
    this.props.onSave(this.state.name, this.props.stage ? this.props.stage._id : undefined);
  }

  private onNameChange = (e: any) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    })
  }
}

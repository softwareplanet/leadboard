import * as React from 'react';
import * as Modal from 'react-modal';
import isBlank from '../../../../../utils/isBlank';
import * as styles from './NameModal.css';

interface Props {
  isModalOpen: boolean;
  name?: string;
  id?: string;
  heading: string;
  
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
  };
  
  public render() {
    return (
      <Modal 
        isOpen={this.props.isModalOpen}
        style={customStyles}
      >
        <h1 className={styles.modalHeader}>{this.props.heading}</h1>
        <form className={styles.modalContent}>
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
                <button type="submit" onClick={this.props.onCancel} className={styles.cancel}>Cancel</button>  
              </div>
            </div>
            <div>Name</div>
          </div>
        </form>
      </Modal>
    );
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.name) {
      this.setState({
        name: nextProps.name,
      });
    }
  }

  private onSave = () => {
    this.props.onSave(this.state.name, this.props.id ? this.props.id : undefined);
  }

  private onNameChange = (e: any) => {
    this.setState({
      name: e.target.value,
    });
  }
}

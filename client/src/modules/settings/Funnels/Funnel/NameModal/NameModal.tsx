import * as React from 'react';
import * as Modal from 'react-modal';
import reactModalStyles from '../../../../../styles/reactModalDefaultStyle';
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

export default class AddStageModal extends React.Component<Props, State> {
  public state: State = {
    name: '',
  };
  private nameModalStyles = { ...reactModalStyles };

  constructor(props: Props){
    super(props);
    this.nameModalStyles.content.width = '400px';
    this.nameModalStyles.content.top = '100px';
  }
  
  public render() {
    return (
      <Modal 
        isOpen={this.props.isModalOpen}
        style={this.nameModalStyles}
      >
        <h1 className={styles.modalHeader}>{this.props.heading}</h1>
        <form onSubmit={this.onSave} className={styles.modalContent}>
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
                  type="submit"
                  disabled={isBlank(this.state.name)} 
                  className={styles.save}
                >
                  Save
                </button>
                <button onClick={this.props.onCancel} className={styles.cancel}>Cancel</button>  
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

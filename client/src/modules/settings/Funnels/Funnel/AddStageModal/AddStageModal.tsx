import * as React from 'react'
import * as Modal from 'react-modal';
// import * as styles from ''
import isBlank from '../../../../../utils/isBlank';

interface Props {
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

export default class AddStageModal extends React.Component<Props> {


  public render() {
    return (
      <Modal 
        isOpen={this.props.isModalOpen}
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
                  disabled={isBlankk(this.state.name)} 
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
    )
  }
}

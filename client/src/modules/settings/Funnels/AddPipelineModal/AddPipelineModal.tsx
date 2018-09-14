import * as React from 'react';
import * as Modal from 'react-modal';
import * as styles from '../Funnel/Funnel.css';

interface Props {
  isModalOpen: boolean;

  onCancelClick(): void;
}

const customStyles = {
  content: {
    top: 100,
    right: 'auto',
    left: '55%',
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

class AddPipelineModal extends React.Component<Props, object> {
  public render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        style={customStyles}
      >
        <h1 className={styles.modalHeader}>Add new pipeline</h1>
        <div className={styles.modalContent}>
          <form>
            <div className={styles.formInput}>
              <label htmlFor="pipeline-name">Title of the pipeline</label>
              <input type="text" id="pipeline-name" />
            </div>
            <div className={styles.formControl}>
              <button>Save</button>
              <span onClick={this.props.onCancelClick}>Cancel</span>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default AddPipelineModal;
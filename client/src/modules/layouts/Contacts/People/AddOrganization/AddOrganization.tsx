import * as React from 'react';
import * as Modal from 'react-modal';
import * as styles from './AddOrganization.css';
import * as classNames from 'classnames';

const customStyles = {
  content: {
    border: '1px solid #e5e5e5',
    borderRadius: '0 0 2px 2px',
    bottom: 'auto',
    boxShadow: '0 10px 45px rgba(38,41,44,.88)',
    boxSizing: 'border-box',
    left: '50%',
    margin: '0',
    padding: '0',
    right: 'auto',
    top: 0,
    transform: 'translate(-50%, 0)',
    width: '350px',
  },
};

interface State {
  modalIsOpen: boolean;
}

class AddOrganization extends React.Component<object, State> {

  public state: State = {
    modalIsOpen: false,
  };

  public render() {
    return (
      <div>
        <button type="button" className={styles.button} onClick={this.openModal}>
          Add organization
        </button>

        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <header className={styles.formHeader}>Add organization</header>
          <button type="button" aria-label="Close" className={styles.closeBtn}>
            <span aria-hidden="true" onClick={this.closeModal} className={classNames("close", styles.closeIcon)}>
              &times;
            </span>
          </button>
          <form className={styles.form}>
            <label className={styles.inputLabel}>Name</label>
            <div className={styles.inputContainer}>
              <input
                name="address"
                type="text"
                className={styles.formInput}
              />
            </div>
            <label className={styles.inputLabel}>Owner</label>
            <label className={styles.inputLabel}>Address</label>
            <div className={styles.inputContainer}>
              <input
                name="address"
                type="text"
                className={styles.formInput}
              />
            </div>
          </form>
          <footer className={styles.formFooter}>
            <button type="button" className={styles.saveBtn}>
              Save
            </button>
          </footer>
        </Modal>
      </div>
    )
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };
}

export default AddOrganization;

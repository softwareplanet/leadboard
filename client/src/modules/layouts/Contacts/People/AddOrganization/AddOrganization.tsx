import * as React from 'react';
import Modal from 'react-modal';
import * as styles from './AddOrganization.css';

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

class AddOrganization extends React.Component {
  public render() {
    return (
      <div>
        <button type="button" className={styles.button}>
          Add person
        </button>

        <Modal >

        </Modal>
      </div>
    )
  }
}

export default AddOrganization;

import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
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

interface State {
  isDropdownOpen: boolean;
  isModalOpen: boolean;
}

class AddOrganization extends React.Component<object, State> {
  public state: State = {
    isDropdownOpen: false,
    isModalOpen: false,
  };

  public render() {
    return (
      <div>
        <button type="button" className={styles.button} onClick={this.openModal}>
          Add organization
        </button>

        <Modal isOpen={this.state.isModalOpen} style={customStyles}>
          <header className={styles.formHeader}>Add organization</header>
          <button type="button" aria-label="Close" className={styles.closeBtn}>
            <span
              aria-hidden="true"
              onClick={this.closeModal}
              className={classNames('close', styles.closeIcon)}
            >
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
            <div className={styles.inputContainer}>
              <Dropdown
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggle}
                className={this.state.isDropdownOpen ? styles.dropdownOpen : styles.dropdownClose}
              >
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.isDropdownOpen}
                >
                  User name
                </DropdownToggle>
                <DropdownMenu className={styles.dropdownMenu}>
                  <div onClick={this.toggle} className={styles.menuItem}>User name</div>
                  <div onClick={this.toggle} className={styles.menuItem}>Bob owner</div>
                  <div onClick={this.toggle} className={styles.menuItem}>Bob</div>
                </DropdownMenu>
              </Dropdown>
            </div>
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
    );
  }

  private toggle = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  private openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }
}

export default AddOrganization;

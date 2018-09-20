import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DomainSettings from '../../../../../models/DomainSettings';
import { addOrganization } from '../organizationActions';
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

interface Props {
  auth: any;
  domainSettings: DomainSettings;

  addOrganization(organization: any): void;
}

interface State {
  address: string;
  isDropdownOpen: boolean;
  isModalOpen: boolean;
  name: string;
}

class AddOrganization extends React.Component<Props, State> {
  public state: State = {
    address: '',
    isDropdownOpen: false,
    isModalOpen: false,
    name: '',
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
          <form className={styles.form} autoComplete="off">
            <label className={styles.inputLabel}>Name</label>
            <div className={styles.inputContainer}>
              <input
                name="name"
                type="text"
                className={styles.formInput}
                onChange={this.handleNameChange}
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
                  {`${this.props.auth.userName} (you)`}
                </DropdownToggle>
                <DropdownMenu className={styles.dropdownMenu}>
                  <div onClick={this.toggle} className={styles.menuItem}>
                    {`${this.props.auth.userName} (you)`}
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
            <label className={styles.inputLabel}>Address</label>
            <div className={styles.inputContainer}>
              <input
                name="address"
                type="text"
                className={styles.formInput}
                onChange={this.handleAddressChange}
              />
            </div>
          </form>
          <footer className={styles.formFooter}>
            <button type="button" className={styles.saveBtn} onClick={this.handleSaveClick}>
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

  private handleNameChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      name: target.value,
    });
  }

  private handleAddressChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      address: target.value,
    });
  }

  private handleSaveClick = () => {
    const customFieldSetting = this.props.domainSettings.customFields
      .find(customField =>
        customField.model === 'Organization' && customField.isDefault && customField.name === 'Address');
    const organization = {
      custom: [
        {
          key: customFieldSetting ? customFieldSetting._id : '',
          value: this.state.address,
        },
      ],
      name: this.state.name,
      owner: this.props.auth.userid,
    };
    this.props.addOrganization(organization);
    this.toggle();
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  domainSettings: state.domain.settings,
});

export { AddOrganization };

export default connect(mapStateToProps, { addOrganization })(AddOrganization);

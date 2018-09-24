import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DomainSettings from '../../../../../models/DomainSettings';
import * as addModalStyles from '../../../../../styles/addingModal.css';
import reactModalStyles from '../../../../../styles/reactModalDefaultStyle';
import isBlank from '../../../../../utils/isBlank';
import * as dropdownStyles from '../../DropdownStyles.css';
import { addContact } from '../contactActions';

const customStyles = { ...reactModalStyles };

interface Props {
  auth: any;
  domainSettings: DomainSettings;
  isModalOpen: boolean;

  addContact(contact: any): void;

  openModal(): void;

  closeModal(): void;
}

interface State {
  address: string;
  email: string;
  isDropdownOpen: boolean;
  isValidationShown: boolean;
  name: string;
  phone: string;
}

class AddContact extends React.Component<Props, State> {
  public state: State = {
    address: '',
    email: '',
    isDropdownOpen: false,
    isValidationShown: false,
    name: '',
    phone: '',
  };

  public render() {
    const { isValidationShown } = this.state;
    return (
      <div>
        <button type="button" className={addModalStyles.saveButton} onClick={this.props.openModal}>
          Add person
        </button>

        <Modal isOpen={this.props.isModalOpen} style={customStyles}>
          <header className={addModalStyles.formHeader}>Add new person</header>
          <button type="button" aria-label="Close" className={addModalStyles.closeBtn}>
            <span
              aria-hidden="true"
              onClick={this.props.closeModal}
              className={classNames('close', addModalStyles.closeIcon)}
            >
              &times;
            </span>
          </button>
          <form className={addModalStyles.form} autoComplete="off">
            <label className={addModalStyles.inputLabel}>Name</label>
            <div
              className={isValidationShown && isBlank(this.state.name)
                ? addModalStyles.invalidContainer
                : addModalStyles.inputContainer}
            >
              <input
                name="name"
                type="text"
                className={addModalStyles.formInput}
                onChange={this.handleNameChange}
              />
            </div>
            <label className={addModalStyles.inputLabel}>Owner</label>
            <div className={addModalStyles.inputContainer}>
              <Dropdown
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggle}
                className={this.state.isDropdownOpen ? dropdownStyles.dropdownOpen : dropdownStyles.dropdownClose}
              >
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.isDropdownOpen}
                >
                  {`${this.props.auth.userName} (you)`}
                </DropdownToggle>
                <DropdownMenu className={dropdownStyles.dropdownMenu}>
                  <div onClick={this.toggle} className={dropdownStyles.dropdownItem}>
                    {`${this.props.auth.userName} (you)`}
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
            <label className={addModalStyles.inputLabel}>Address</label>
            <div className={addModalStyles.inputContainer}>
              <input
                name="address"
                type="text"
                className={addModalStyles.formInput}
                onChange={this.handleAddressChange}
              />
            </div>
          </form>
          <footer className={addModalStyles.formFooter}>
            <button type="button" className={addModalStyles.saveButton} onClick={this.handleSaveClick}>
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
    if (!isBlank(this.state.name)) {
      const customFieldSetting = this.props.domainSettings.customFields
        .find(customField =>
          customField.model === 'Organization' && customField.isDefault && customField.name === 'Address');
      const contact = {
        custom: [
          {
            key: customFieldSetting ? customFieldSetting._id : '',
            value: this.state.address,
          },
        ],
        name: this.state.name,
      };
      this.props.addContact(contact);
      this.props.closeModal();
    } else {
      this.setState({
        isValidationShown: true,
      });
    }
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  domainSettings: state.domain.settings,
});

export { AddContact };

export default connect(mapStateToProps, { addContact })(AddContact);

import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import CustomFieldSetting from '../../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../../models/DomainSettings';
import * as addModalStyles from '../../../../../styles/addingModal.css';
import reactModalStyles from '../../../../../styles/reactModalDefaultStyle';
import isBlank from '../../../../../utils/isBlank';
import { getCustomFieldSettingsByModel } from '../../../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
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
  isDropdownOpen: boolean;
  isValidationShown: boolean;
  name: string;

  [field: string]: string | boolean;
}

class AddContact extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
    isValidationShown: false,
    name: '',
  };

  public render() {
    const { isValidationShown } = this.state;
    const customFieldSettings = this.getDefaultCustomFieldSettings();
    const customFieldInputs = customFieldSettings.map(setting => (
      <div key={setting._id}>
        <label className={addModalStyles.inputLabel}>{setting.name}</label>
        <div className={addModalStyles.inputContainer}>
          <input
            name={setting._id}
            type="text"
            className={addModalStyles.formInput}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    ));

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
                onChange={this.handleInputChange}
              />
            </div>
            <label className={addModalStyles.inputLabel}>Owner</label>
            <div className={addModalStyles.inputContainer}>
              <Dropdown
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggleDropdown}
                className={this.state.isDropdownOpen ? dropdownStyles.dropdownOpen : dropdownStyles.dropdownClose}
              >
                <DropdownToggle
                  tag="span"
                  onClick={this.toggleDropdown}
                  data-toggle="dropdown"
                  aria-expanded={this.state.isDropdownOpen}
                >
                  {`${this.props.auth.userName} (you)`}
                </DropdownToggle>
                <DropdownMenu className={dropdownStyles.dropdownMenu}>
                  <div onClick={this.toggleDropdown} className={dropdownStyles.dropdownItem}>
                    {`${this.props.auth.userName} (you)`}
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
            {customFieldInputs}
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

  private getDefaultCustomFieldSettings(): CustomFieldSetting[] {
    return getCustomFieldSettingsByModel('Contact', this.props.domainSettings)
      .filter(customFieldSetting => customFieldSetting.isDefault);
  }

  private toggleDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  private handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({
      [target.name]: target.value,
    });
  }

  private handleSaveClick = () => {
    if (!isBlank(this.state.name)) {
      const newName = this.state.name;
      const stateCopy = { ...this.state };
      delete stateCopy.isValidationShown;
      delete stateCopy.isDropdownOpen;
      delete stateCopy.name;
      const newCustomFields: any[] = [];
      this.getDefaultCustomFieldSettings()
        .map((setting: CustomFieldSetting) => {
          if (setting._id && stateCopy[setting._id] && !isBlank('' + stateCopy[setting._id])) {
            newCustomFields.push({
              key: setting._id,
              value: stateCopy[setting._id],
            });
          }
        });

      const contact = {
        custom: newCustomFields,
        name: newName,
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

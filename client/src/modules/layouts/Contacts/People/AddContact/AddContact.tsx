import * as classNames from 'classnames';
import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import CustomFieldSetting from '../../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../../models/DomainSettings';
import Organization from '../../../../../models/Organization';
import * as addingModalStyles from '../../../../../styles/addingModal.css';
import reactModalStyles from '../../../../../styles/reactModalDefaultStyle';
import isBlank from '../../../../../utils/isBlank';
import OrganizationAutocomplete from '../../../../common/autocomplete/organization/OrganizationAutocomplete';
import { autocompleteStyles } from '../../../../common/autocomplete/styles/autocomplete-styles';
import { getCustomFieldSettingsByModel } from '../../../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
import * as dropdownStyles from '../../DropdownStyles.css';
import { loadOrganizations } from '../../Organizations/organizationActions';
import { addContact } from '../contactActions';

const customStyles = { ...reactModalStyles };

interface Props {
  auth: any;
  domainSettings: DomainSettings;
  isModalOpen: boolean;
  organizations: Organization[];

  addContact(contact: any): void;

  loadOrganizations(): void;

  openModal(): void;

  closeModal(): void;
}

interface State {
  afterOrganizationSelectShowBadge: boolean;
  isDropdownOpen: boolean;
  isValidationShown: boolean;
  openOrganizationDropdown: boolean;
  name: string;
  organization: {
    name?: string;
    id?: string;
  };
  showOrganizationBadge: boolean;

  [field: string]: any;
}

class AddContact extends React.Component<Props, State> {
  private defaultState: State = {
    afterOrganizationSelectShowBadge: false,
    isDropdownOpen: false,
    isValidationShown: false,
    name: '',
    openOrganizationDropdown: false,
    organization: {
      name: '',
    },
    showOrganizationBadge: false,
  };
  public state: State = this.defaultState;
  private autocompleteStyles = { ...autocompleteStyles.organization };
  private autocompleteWrapper = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.autocompleteStyles.menu.top = 300;
  }

  public componentWillMount() {
    this.props.loadOrganizations();
  }

  public render() {
    const { isValidationShown } = this.state;
    const customFieldSettings = this.getDefaultCustomFieldSettings();
    const customFieldInputs = customFieldSettings.map(setting => (
      <div key={setting._id}>
        <label className={addingModalStyles.inputLabel}>{setting.name}</label>
        <div className={addingModalStyles.inputContainer}>
          <input
            name={setting._id}
            type="text"
            className={addingModalStyles.formInput}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    ));

    return (
      <div>
        <button type="button" className={addingModalStyles.saveButton} onClick={this.openAddingModal}>
          Add person
        </button>

        <Modal isOpen={this.props.isModalOpen} style={customStyles}>
          <header className={addingModalStyles.formHeader}>Add new person</header>
          <button type="button" aria-label="Close" className={addingModalStyles.closeBtn}>
            <span
              aria-hidden="true"
              onClick={this.props.closeModal}
              className={classNames('close', addingModalStyles.closeIcon)}
            >
              &times;
            </span>
          </button>
          <form className={addingModalStyles.form} autoComplete="off">
            <label className={addingModalStyles.inputLabel}>Name</label>
            <div
              className={isValidationShown && isBlank(this.state.name)
                ? addingModalStyles.invalidContainer
                : addingModalStyles.inputContainer}
            >
              <input
                name="name"
                type="text"
                className={addingModalStyles.formInput}
                onChange={this.handleInputChange}
              />
            </div>
            {customFieldInputs}
            <label className={addingModalStyles.inputLabel}>
              Organization name
            </label>
            <div
              ref={this.autocompleteWrapper}
              className={addingModalStyles.inputContainer}>
              <i className={classNames('fas fa-building', addingModalStyles.inputIcon)} />
              <OrganizationAutocomplete
                inputStyle={autocompleteStyles.addLeadInput}
                items={this.props.organizations}
                itemsCount={4}
                onBlur={this.handleAutocompleteBlur}
                onChange={this.handleOrganizationChange}
                onFocus={this.handleAutocompleteFocus}
                onSelect={this.handleOrganizationSelect}
                value={this.state.organization.name}
                open={this.state.openOrganizationDropdown}
                styles={this.autocompleteStyles}
              />
              {this.state.showOrganizationBadge ?
                <span id="organization-badge" className={addingModalStyles.newBadge}>NEW</span> : null}
            </div>
            <label className={addingModalStyles.inputLabel}>Owner</label>
            <div className={addingModalStyles.inputContainer}>
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
          </form>
          <footer className={addingModalStyles.formFooter}>
            <button type="button" className={addingModalStyles.saveButton} onClick={this.handleSaveClick}>
              Save
            </button>
          </footer>
        </Modal>
      </div>
    );
  }

  private openAddingModal = () => {
    this.props.loadOrganizations();
    this.props.openModal();
    this.setState(this.defaultState);
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

  private handleAutocompleteFocus = (event: any) => {
    event.target.parentNode.parentNode.setAttribute('style', 'border: 1px solid #317ae2');
  }

  private handleAutocompleteBlur = () => {
    if (this.autocompleteWrapper.current) {
      this.autocompleteWrapper.current.removeAttribute('style');
    }
    this.setState({
      openOrganizationDropdown: false,
      showOrganizationBadge: this.state.afterOrganizationSelectShowBadge
        && !this.state.organization.id
        && !isBlank(''+this.state.organization.name),
    });
  }

  private handleSaveClick = () => {
    if (!isBlank(this.state.name)) {
      const newName = this.state.name;
      const organization = this.state.organization;
      const stateCopy = { ...this.state };
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
        organization: organization.id ? organization.id : organization.name,
      };
      this.props.addContact(contact);
      this.props.closeModal();
    } else {
      this.setState({
        isValidationShown: true,
      });
    }
  }

  private handleOrganizationSelect = (value: any, item: any) => {
    this.setState({
      afterSelectShowBadge: false,
      openOrganizationDropdown: false,
      organization: {
        id: item._id,
        name: value,
      },
      showOrganizationBadge: false,
    });
  }

  private handleOrganizationChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.value;
    this.setState({
      afterOrganizationSelectShowBadge: true,
      openOrganizationDropdown: !isBlank(name),
      organization: {
        name,
      },
    });
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  domainSettings: state.domain.settings,
  organizations: state.organizations,
});

export { AddContact };

export default connect(mapStateToProps, { addContact, loadOrganizations })(AddContact);

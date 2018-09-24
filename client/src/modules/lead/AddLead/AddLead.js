import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadOrganizations } from "../../layouts/Contacts/Organizations/organizationActions";
import { loadContacts } from "../../layouts/Contacts/People/contactActions";
import { createLead } from "../leadActions";
import classNames from "classnames";
import addingModalStyles from "../../../styles/addingModal.css";
import { isEmpty, trim } from "lodash/fp";
import isBlank from "../../../utils/isBlank";

import SelectStageOnCreation from "./SelectStage/SelectStageOnCreation";
import OrganizationAutocomplete from "../../common/autocomplete/organization/OrganizationAutocomplete";
import ContactAutocomplete from "../../common/autocomplete/contact/ContactAutocomplete";
import { autocompleteStyles } from "../../common/autocomplete/styles/autocomplete-styles";
import reactModalStyles from "../../../styles/reactModalDefaultStyle";

const customStyles = { ...reactModalStyles };

const initialState = {
  name: "",
  stage: "",

  contact: { id: null, name: "" },
  organization: { id: null, name: "" },
  errors: {},

  openContactDropdown: false,
  openOrganizationDropdown: false,

  showOrganizationBadge: false,
  showContactBadge: false,

  afterOrganizationSelectShowBadge: false,
  afterContactSelectShowBadge: false,

  isNameChanged: false,
  namePlaceholder: "",

  organizationAfterSelect: { id: null, name: "" },
  contactAfterSelect: { id: null, name: "" },

  validationIsShown: false,
  modalIsOpen: false,
};

class AddLead extends React.Component {
  contactWrapper = React.createRef();
  organizationWrapper = React.createRef();
  contactAutocomplete = React.createRef();
  organizationAutocomplete = React.createRef();

  state = initialState;

  openModal = () => {
    const { stages } = this.props.dashboard;
    this.props.loadContacts();
    this.props.loadOrganizations();
    this.setState({
      modalIsOpen: true,
      stage: Object.keys(stages).length > 0 ? stages[0]._id : "",
    });
  };

  closeModal = () => {
    this.setState(initialState);
  };

  removeErrorFromState = fieldName => {
    let newErrors = { ...this.state.errors };
    delete newErrors[fieldName];
    return newErrors;
  };

  onNameChange = (event) => {
    let name = event.target.value;
    this.setState({
      ...this.state,
      isNameChanged: isBlank(name) ? false : name !== this.state.name,
      name,
      errors: this.removeErrorFromState("name"),
    });
  };

  onOrganizationChange = (event) => {
    let name = event.target.value;
    let newState = {
      ...this.state,
      organization: {
        id: this.state.organizationAfterSelect.name === name ? this.state.organizationAfterSelect.id : null,
        name,
      },
      openOrganizationDropdown: !isBlank(name),
      afterOrganizationSelectShowBadge: true,
    };
    this.setState({
      ...newState,
      errors: {},
    });
  };

  onOrganizationSelect = (value, item) => {
    this.setState({
      organizationAfterSelect: {
        id: item._id,
        name: value,
      },
      organization: {
        id: item._id,
        name: value,
      },
      name: !this.state.isNameChanged ?
        `${value} lead` : `${this.state.name}`,
      openOrganizationDropdown: false,
      showOrganizationBadge: false,
      afterSelectShowBadge: false,
    }, () => this.organizationAutocomplete.current.inputBlur());
  };

  getNameValue = () => {
    let name = "";
    if (!isBlank(this.state.organization.name)) {
      name = this.state.isNameChanged ? this.state.name : trim(this.state.organization.name) + " lead";
    } else {
      if (!isBlank(this.state.contact.name)) {
        name = this.state.isNameChanged ? this.state.name : trim(this.state.contact.name) + " lead";
      } else {
        name = this.state.isNameChanged ? this.state.name : "";
      }
    }
    return name;
  };

  getPlaceholderValue = () => {
    let placeholder = "";
    if (!isBlank(this.state.organization.name)) {
      placeholder = trim(this.state.organization.name) + " lead";
    } else {
      if (!isBlank(this.state.contact.name)) {
        placeholder = trim(this.state.contact.name) + " lead";
      } else placeholder = "";
    }
    return placeholder;
  };

  onOrganizationBlur = () => {
    this.organizationWrapper.current.removeAttribute("style");
    this.setState({
      ...this.state,
      name: this.getNameValue(),
      organization: {
        id: this.state.organizationAfterSelect.id,
        name: trim(this.state.organization.name),
      },
      namePlaceholder: this.getPlaceholderValue(),
      isNameChanged: isBlank(this.state.organization.name) && isBlank(this.state.contact.name) ? false : this.state.isNameChanged,
      openOrganizationDropdown: false,
      showOrganizationBadge: this.state.afterOrganizationSelectShowBadge && !this.state.organization.id && !isBlank(this.state.organization.name),
    });
  };

  onContactChange = (event) => {
    let value = event.target.value;
    let newState = {
      ...this.state,
      contact: {
        id: this.state.contactAfterSelect.name === value ? this.state.contactAfterSelect.id : null,
        name: value,
      },
      openContactDropdown: !isBlank(value),
      afterContactSelectShowBadge: true,
    };
    this.setState({
      ...newState,
      errors: {},
    });
  };

  onContactSelect = (value, item) => {
    this.setState({
      contact: {
        id: item._id,
        name: value,
      },
      contactAfterSelect: {
        id: item._id,
        name: value,
      },
      organization: {
        id: item.organization !== undefined ? item.organization._id : this.state.organization._id,
        name: item.organization !== undefined ? item.organization.name : this.state.organization.name,
      },
      organizationAfterSelect: {
        id: item.organization !== undefined ? item.organization._id : this.state.organization._id,
        name: item.organization !== undefined ? item.organization.name : this.state.organization.name,
      },
      openContactDropdown: false,
      showContactBadge: false,
      showOrganizationBadge: false,
      afterContactSelectShowBadge: false,
    }, () => this.contactAutocomplete.current.inputBlur());
  };

  onContactBlur = () => {
    this.contactWrapper.current.removeAttribute("style");
    this.setState({
      ...this.state,
      name: this.getNameValue(),
      contact: {
        id: this.state.contactAfterSelect.id,
        name: trim(this.state.contact.name),
      },
      namePlaceholder: this.getPlaceholderValue(),
      isNameChanged: this.state.isNameChanged,
      openContactDropdown: false,
      showContactBadge: this.state.afterContactSelectShowBadge && !this.state.contact.id && !isBlank(this.state.contact.name),
    }, () => this.organizationAutocomplete.current.inputBlur());
  };

  onAutocompleteFocus = (event) => {
    event.target.parentNode.parentNode.setAttribute("style", "border: 1px solid #317ae2");
  };

  onFocus = (event) => {
    event.target.parentNode.setAttribute("style", "border: 1px solid #317ae2");
  };

  onBlur = (event) => {
    event.target.parentNode.removeAttribute("style");
  };

  validateLead = lead => {
    let errors = {};
    let name = lead.name;

    if (isBlank(!isBlank(name) ? name : lead.namePlaceholder)) {
      errors.name = "Name must not be empty";
    }
    if (isBlank(lead.organization.name) && isBlank(lead.contact.name)) {
      errors.organization = "Organisation or contact must not be empty";
      errors.contact = "Contact or organisation must not be empty";
    }
    return errors;
  };

  onSubmit = () => {
    this.setState({
      validationIsShown: true,
    });

    let errors = this.validateLead(this.state);
    if (isEmpty(errors)) {
      const lead = {
        domain: this.props.auth.domainid,
        owner: this.props.auth.userid,
        stage: this.state.stage,
        name: !isBlank(this.state.name) ? trim(this.state.name) : trim(this.state.namePlaceholder),
        contact: this.state.contact.id ? this.state.contact.id : this.state.contact.name,
        organization: this.state.organization.id ? this.state.organization.id : this.state.organization.name,
        order: this.getNextLeadNumber(this.state.stage),
      };
      this.props.createLead(lead);
      this.closeModal();
    } else {
      this.setState({ errors: errors });
    }
  };

  getNextLeadNumber = stage => {
    return this.props.dashboard.leads[`_${stage}`].leads.length + 1;
  };

  selectStageHandler = stageid => {
    this.setState({ stage: stageid });
  };

  render() {
    const { errors, validationIsShown } = this.state;
    const autocompleteProps = {
      onFocus: this.onAutocompleteFocus,
      inputStyle: autocompleteStyles.addLeadInput,
      itemsCount: 5,
    };

    return (
      <div>
          <button type="button" className={addingModalStyles.saveButton} onClick={this.openModal}>
            Add lead
          </button>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} shouldCloseOnOverlayClick={false}
          style={customStyles}>
          <header className={addingModalStyles.formHeader}>Add lead</header>
          <button type="button" onClick={this.closeModal} aria-label="Close" className={addingModalStyles.closeBtn}>
            <span aria-hidden="true" className={classNames("close", addingModalStyles.closeIcon)}>
              &times;
            </span>
          </button>
          <form autoComplete="off" className={addingModalStyles.form}>

            <label className={addingModalStyles.inputLabel}>Contact person name</label>
            <div
              ref={this.contactWrapper}
              className={validationIsShown && errors.contact ? addingModalStyles.invalidContainer : addingModalStyles.inputContainer}>
              <i className={classNames("fas fa-user", addingModalStyles.inputIcon)} />
              <ContactAutocomplete
                {...autocompleteProps}
                items={this.props.contacts}
                onChange={this.onContactChange}
                onSelect={this.onContactSelect}
                onBlur={this.onContactBlur}
                value={this.state.contact.name}
                open={this.state.openContactDropdown}
                styles={autocompleteStyles.contact}
                ref={this.contactAutocomplete} />
              {this.state.showContactBadge ? <span id="contact-badge" className={addingModalStyles.newBadge}>NEW</span> : null}
            </div>

            <label className={addingModalStyles.inputLabel}>
              Organization name
            </label>
            <div
              ref={this.organizationWrapper}
              className={validationIsShown && errors.organization ? addingModalStyles.invalidContainer : addingModalStyles.inputContainer}>
              <i className={classNames("fas fa-building", addingModalStyles.inputIcon)} />
              <OrganizationAutocomplete
                {...autocompleteProps}
                items={this.props.organizations}
                onChange={this.onOrganizationChange}
                onSelect={this.onOrganizationSelect}
                onBlur={this.onOrganizationBlur}
                value={this.state.organization.name}
                open={this.state.openOrganizationDropdown}
                styles={autocompleteStyles.organization}
                ref={this.organizationAutocomplete} />
              {this.state.showOrganizationBadge ?
                <span id="organization-badge" className={addingModalStyles.newBadge}>NEW</span> : null}
            </div>

            <label className={addingModalStyles.inputLabel}>Lead name</label>
            <div className={validationIsShown && errors.name ? addingModalStyles.invalidContainer : addingModalStyles.inputContainer}>
              <input
                placeholder={this.state.namePlaceholder}
                name="name"
                type="text"
                className={addingModalStyles.formInput}
                value={this.state.name}
                onChange={this.onNameChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur} />
            </div>
            <SelectStageOnCreation 
              stages={this.props.dashboard.stages} 
              onStageChange={this.selectStageHandler} 
              title="Lead's stage"
            />
          </form>
          <div className={addingModalStyles.formFooter}>
            <button type="button" className={addingModalStyles.saveButton} onClick={this.onSubmit}>
              Save
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

AddLead.propTypes = {
  dashboard: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  contacts: state.contacts,
  organizations: state.organizations.organizations,
  auth: state.auth,
  errors: state.errors,
});

export { AddLead };

export default connect(
  mapStateToProps,
  { loadOrganizations, createLead, loadContacts },
)(AddLead);

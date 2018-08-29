import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadOrganizations } from "./autocomplete/organization/organizationActions";
import { loadContacts } from "./autocomplete/contact/contactActions";
import { createLead } from "../leadActions";
import classNames from "classnames";
import styles from "./AddLead.css";
import { isEmpty } from "lodash/fp";
import isBlank from "../../../utils/isBlank";

import SelectStageOnCreation from "./SelectStage/SelectStageOnCreation";
import OrganizationAutocomplete from "./autocomplete/organization/OrganizationAutocomplete";
import ContactAutocomplete from "./autocomplete/contact/ContactAutocomplete";

const customStyles = {
  content: {
    top: 0,
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    margin: "0",
    padding: "0",
    width: "350px",
    borderRadius: "0 0 2px 2px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 10px 45px rgba(38,41,44,.88)",
    boxSizing: "border-box",
  },
};

class AddLead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      stage: "",
      organizations: [],
      contacts: [],

      contact: { id: null, name: "" },
      organization: { id: null, name: "" },
      errors: {},

      openContactDropdown: false,
      openOrganizationDropdown: false,

      showOrganizationBadge: false,
      showContactBadge: false,

      afterOrganizationSelectShowBadge: false,
      afterContactSelectShowBadge: false,

      nameChanged: false,
      namePlaceholder: "",
      showPlaceholder: false,

      organizationAfterSelect: { id: null, name: "" },
      contactAfterSelect: { id: null, name: "" },

      validationIsShown: false,
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectStageHandler = this.selectStageHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leads) {
      this.setState({
        contacts: nextProps.contacts,
        organizations: nextProps.organizations,
      });
    }
  }

  openModal() {
    const { stages } = this.props.leads;
    this.props.loadContacts();
    this.props.loadOrganizations();
    this.setState({
      modalIsOpen: true,
      stage: Object.keys(stages).length > 0 ? stages[0]._id : "",
    });
  }

  closeModal() {
    this.setState({
      name: "",
      stage: "",
      organizations: [],
      contacts: [],

      contact: { id: null, name: "" },
      organization: { id: null, name: "" },
      errors: {},

      openContactDropdown: false,
      openOrganizationDropdown: false,

      showOrganizationBadge: false,
      showContactBadge: false,

      afterOrganizationSelectShowBadge: false,
      afterContactSelectShowBadge: false,

      nameChanged: false,
      namePlaceholder: "",
      showPlaceholder: false,

      organizationAfterSelect: { id: null, name: "" },
      contactAfterSelect: { id: null, name: "" },

      validationIsShown: false,
      modalIsOpen: false,
    });
  }

  onNameChange = (event) => {
    this.setState({
      ...this.state,
      nameChanged: event.target.value !== this.state.name,
      name: event.target.value,
      showPlaceholder: this.state.name.length === 0,
      errors: {
        ...this.state.errors,
        name: undefined,
      },
    });
  };

  onOrganizationChange = (event) => {
    let newState = {
      ...this.state,
      organization: {
        id: this.state.organizationAfterSelect.name === event.target.value ? this.state.organizationAfterSelect.id : null,
        name: event.target.value,
      },
      openOrganizationDropdown: true,
      afterOrganizationSelectShowBadge: true,
    };
    this.setState({
      ...newState,
      errors: {
        ...this.state.errors,
        contact: undefined,
        organization: undefined,
        name: undefined,
      },
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
      name: !this.state.nameChanged ?
        `${value} lead` : `${this.state.name}`,
      openOrganizationDropdown: false,
      showBadge: false,
      afterSelectShowBadge: false,
    }, () => this.onOrganizationBlur());
  };

  getNameValue = () => {
    let name = "";
    if (this.state.organization.name.length > 0) {
      if (this.state.nameChanged) {
        name = this.state.name;
      } else {
        name = this.state.organization.name + " lead";
      }
    } else {
      if(this.state.contact.name.length > 0) {
        if (this.state.nameChanged) {
          name = this.state.name;
        } else {
          name = this.state.contact.name + " lead";
        }
      } else name = "";
    }
    return name;
  };

  getPlaceholderValue = () => {
    let placeholder = "";
    if (this.state.organization.name.length > 0) {
      placeholder = this.state.organization.name + " lead";
    } else {
     if(this.state.contact.name.length > 0) {
       placeholder = this.state.contact.name + " lead";
     } else placeholder = "";
    }
    return placeholder;
  };

  onOrganizationBlur = () => {
    document.getElementById("organization-wrapper").removeAttribute("style");
    this.setState({
      ...this.state,
      name: this.getNameValue(),
      namePlaceholder: this.getPlaceholderValue(),
      nameChanged: this.state.organization.name.length === 0 && this.state.contact.name.length === 0 ? false : this.state.nameChanged,
      openOrganizationDropdown: false,
      showOrganizationBadge: this.state.organization.name.length > 0 && this.state.afterOrganizationSelectShowBadge && !this.state.organization.id,
    });
  };

  onContactChange = (event) => {
    let newState = {
      ...this.state,
      contact: {
        id: this.state.contactAfterSelect.name === event.target.value ? this.state.contactAfterSelect.id : null,
        name: event.target.value,
      },
      openContactDropdown: true,
      afterContactSelectShowBadge: true,
    };
    this.setState({
      ...newState,
      errors: {
        ...this.state.errors,
        contact: undefined,
        organization: undefined,
        name: undefined,
      },
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
      openContactDropdown: false,
      showContactBadge: false,
      afterContactSelectShowBadge: false,
    }, () => this.onContactBlur())
  };

  onContactBlur = () => {
    document.getElementById("contact-wrapper").removeAttribute("style");
    this.setState({
      ...this.state,
      name: this.getNameValue(),
      namePlaceholder: this.getPlaceholderValue(),
      nameChanged: this.state.organization.name.length === 0 && this.state.contact.name.length === 0 ? false : this.state.nameChanged,
      openContactDropdown: false,
      showContactBadge: this.state.contact.name.length > 0 && this.state.afterContactSelectShowBadge && !this.state.contact.id,
    }, () => this.onOrganizationBlur())
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

  validateLead(lead) {
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
  }

  onSubmit() {
    this.setState({
      validationIsShown: true,
    });

    let errors = this.validateLead(this.state);
    if (isEmpty(errors)) {
      const lead = {
        domain: this.props.auth.domainid,
        owner: this.props.auth.userid,
        stage: this.state.stage,
        name: this.state.name.length > 0 ? this.state.name : this.state.namePlaceholder,
        contact: this.state.contact.id ? this.state.contact.id : this.state.contact.name,
        organization: this.state.organization.id ? this.state.organization.id : this.state.organization.name,
        order: this.getNextLeadNumber(this.state.stage),
      };
      this.props.createLead(lead);
      this.closeModal();
    } else {
      this.setState({ errors: errors });
    }
  }

  getNextLeadNumber(stage) {
    return this.props.leads.leads[`_${stage}`].leads.length + 1;
  }

  selectStageHandler(stageid) {
    this.setState({ stage: stageid });
  }

  render() {
    const { errors, validationIsShown } = this.state;
    return (
      <div>
        <div className={styles.toolPanel}>
          <button type="button" className={styles.button} onClick={this.openModal}>
            Add lead
          </button>
        </div>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} shouldCloseOnOverlayClick={false}
               style={customStyles}>
          <header className={styles.formHeader}>Add lead</header>
          <button type="button" onClick={this.closeModal} aria-label="Close" className={styles.closeBtn}>
            <span aria-hidden="true" className={classNames("close", styles.closeIcon)}>
              &times;
            </span>
          </button>
          <form autoComplete="off" className={styles.form}>

            <label className={styles.inputLabel}>Contact person name</label>
            <div id="contact-wrapper" className={validationIsShown && errors.contact ? styles.invalidContainer : styles.inputContainer}>
              <i className={classNames("fas fa-user", styles.inputIcon)}/>
              <ContactAutocomplete
                items={this.state.contacts}
                onFocus={this.onAutocompleteFocus}
                onChange={this.onContactChange}
                onSelect={this.onContactSelect}
                onBlur={this.onContactBlur}
                value={this.state.contact.name}
                open={this.state.openContactDropdown}
              />
              {this.state.showContactBadge ? <span id="contact-badge" className={styles.newBadge}>NEW</span> : null}
            </div>

            <label className={styles.inputLabel}>
              Organization name
            </label>
            <div id="organization-wrapper" className={validationIsShown && errors.organization
              ? styles.invalidContainer
              : styles.inputContainer}>
              <i className={classNames("fas fa-building", styles.inputIcon)}/>
              <OrganizationAutocomplete
                items={this.state.organizations}
                onFocus={this.onAutocompleteFocus}
                onChange={this.onOrganizationChange}
                onSelect={this.onOrganizationSelect}
                onBlur={this.onOrganizationBlur}
                value={this.state.organization.name}
                open={this.state.openOrganizationDropdown}
              />
              {this.state.showOrganizationBadge ? <span id="organization-badge" className={styles.newBadge}>NEW</span> : null}
            </div>

            <label className={styles.inputLabel}>Lead name</label>
            <div className={validationIsShown && errors.name ? styles.invalidContainer : styles.inputContainer}>
              <input
                placeholder={this.state.namePlaceholder}
                name="name"
                type="text"
                className={styles.formInput}
                value={this.state.name}
                onChange={this.onNameChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            </div>
            <SelectStageOnCreation stages={this.props.leads.stages} onStageChange={this.selectStageHandler} />
          </form>
          <div className={styles.formFooter}>
            <button type="button" className={styles.saveBtn} onClick={this.onSubmit}>
              Save
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

AddLead.propTypes = {
  leads: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  leads: state.leads,
  contacts: state.contacts,
  organizations: state.organizations,
  auth: state.auth,
  errors: state.errors,
});
export { AddLead };
export default connect(
  mapStateToProps,
  { loadOrganizations, createLead, loadContacts },
)(AddLead);

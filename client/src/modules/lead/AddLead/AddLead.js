import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../leadActions";
import classNames from "classnames";
import styles from "./AddLead.css";
import { flow, isEmpty, trim } from "lodash/fp";
import SelectStageOnCreation from "./SelectStage/SelectStageOnCreation";

import ContactAutocomplete from "./ContactAutocomplete/ContactAutocomplete";
import { loadContacts } from "./ContactAutocomplete/contactActions";

const isBlank = flow(
  trim,
  isEmpty,
);

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
      contact: { id: null, name: "" },
      organization: {id: null, name: ""},
      errors: {},
      contacts: [],
      openContactDropdown: false,
      validationIsShown: false,
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.selectStageHandler = this.selectStageHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leads) {
      this.setState({
        contacts: nextProps.contacts,
      });
    }
  }

  openModal() {
    const { stages } = this.props.leads;
    this.props.loadContacts(this.props.auth.domainid);
    this.setState({
      modalIsOpen: true,
      stage: Object.keys(stages).length > 0 ? stages[0]._id : "",
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      validationIsShown: false,
      errors: {},
      name: "",
      contact: { id: null, name: "" },
      organization: {id: null, name: ""},
      showContactBadge: false,
    });
  }

  onChange(event) {
    let newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      errors: this.validateLead(newState),
    });
  }

  validateLead(lead) {
    let errors = {};
    if (isBlank(lead.name)) {
      errors.name = "Name must not be empty";
    }
    if (isBlank(lead.organization) && isBlank(lead.contact)) {
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
        name: this.state.name,
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

  onContactChange = (event) => {
    this.setState({
      contact: {
        name: event.target.value,
      },
      openContactDropdown: true,
      afterSelectShowBadge: true,
    });
  };

  onContactSelect = (value, id, organization) => {
    this.setState({
      contact: {
        id,
        name: value,
      },
      organization: {
        id: organization !== undefined ? organization._id : null,
        name: organization !== undefined ? organization.name : "",
      },
      name: organization !== undefined ? organization.name + " deal" : "",
      openContactDropdown: false,
      showContactBadge: false,
      afterSelectShowBadge: false,
    });
  };

  onContactBlur = () => {
    this.setState({
      openContactDropdown: false,
      showContactBadge: this.state.contact.name.length > 1 && this.state.afterSelectShowBadge,
    });
  };

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
            <div className={validationIsShown && errors.contact ? styles.invalidContainer : styles.inputContainer}>
              <i className={classNames("fas fa-user", styles.inputIcon)}/>
              <ContactAutocomplete
                items={this.state.contacts}
                onChange={this.onContactChange}
                onSelect={this.onContactSelect}
                onBlur={this.onContactBlur}
                value={this.state.contact.name}
                open={this.state.openContactDropdown}
              />
              {this.state.showContactBadge ? <span className={styles.newBadge}>NEW</span> : null}
            </div>

            <label className={styles.inputLabel}>Organization name</label>
            <div className={validationIsShown && errors.organization ? styles.invalidContainer : styles.inputContainer}>
              <i className={classNames("fas fa-building", styles.inputIcon)}/>
              <input
                name="organization"
                type="text"
                className={styles.formInput}
                onChange={this.onChange}
                value={this.state.organization.name}
              />
            </div>

            <label className={styles.inputLabel}>Lead title</label>
            <div className={validationIsShown && errors.name ? styles.invalidContainer : styles.inputContainer}>
              <input
                name="name"
                type="text"
                className={styles.formInput}
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <SelectStageOnCreation stages={this.props.leads.stages} onStageChange={this.selectStageHandler}/>
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
  contacts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads,
  contacts: state.contacts,
  auth: state.auth,
  errors: state.errors,
});
export { AddLead };
export default connect(
  mapStateToProps,
  { createLead, loadContacts },
)(AddLead);

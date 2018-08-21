import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../leadActions";
import classNames from "classnames";
import styles from "./AddLead.css";
import { isEmpty } from "lodash/fp";
import isBlank from "../../../utils/isBlank";
import SelectStageOnCreation from "./SelectStage/SelectStageOnCreation";

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
    boxSizing: "border-box"
  }
};

class AddLead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      stage: "",
      contact: "",
      organization: "",
      errors: {},

      validationIsShown: false,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.selectStageHandler = this.selectStageHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal() {
    const { stages } = this.props.leads;
    this.setState({
      modalIsOpen: true,
      stage: Object.keys(stages).length > 0 ? stages[0]._id : ""
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      validationIsShown: false,
      errors: {},
      name: "",
      contact: "",
      organization: ""
    });
  }

  onChange(event) {
    let newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      errors: this.validateLead(newState)
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
      validationIsShown: true
    });

    let errors = this.validateLead(this.state);
    if (isEmpty(errors)) {
      const lead = {
        domain: this.props.auth.domainid,
        owner: this.props.auth.userid,
        stage: this.state.stage,
        name: this.state.name,
        contact: this.state.contact,
        organization: this.state.organization,
        order: this.getNextLeadNumber(this.state.stage)
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

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} shouldCloseOnOverlayClick={false} style={customStyles}>
          <header className={styles.formHeader}>Add lead</header>
          <button type="button" onClick={this.closeModal} aria-label="Close" className={styles.closeBtn}>
            <span aria-hidden="true" className={classNames("close", styles.closeIcon)}>
              &times;
            </span>
          </button>
          <form autoComplete="off" className={styles.form}>
            <label className={styles.inputLabel}>Contact person name</label>
            <div className={validationIsShown && errors.contact ? styles.invalidContainer : styles.inputContainer}>
              <i className={classNames("fas fa-user", styles.inputIcon)} />
              <input name="contact" type="text" className={styles.formInput} onChange={this.onChange} />
            </div>

            <label className={styles.inputLabel}>Organization name</label>
            <div className={validationIsShown && errors.organization ? styles.invalidContainer : styles.inputContainer}>
              <i className={classNames("fas fa-building", styles.inputIcon)} />
              <input name="organization" type="text" className={styles.formInput} onChange={this.onChange} />
            </div>

            <label className={styles.inputLabel}>Lead title</label>
            <div className={validationIsShown && errors.name ? styles.invalidContainer : styles.inputContainer}>
              <input name="name" type="text" className={styles.formInput} onChange={this.onChange} />
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads,
  auth: state.auth,
  errors: state.errors
});
export { AddLead };
export default connect(
  mapStateToProps,
  { createLead }
)(AddLead);

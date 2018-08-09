import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../../actions/leadActions";
import classNames from "classnames";
import "./AddLead.css";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    margin: "0",
    padding: "0",
    width: "350px",
    borderRadius: "0 0 2px 2px",
    border: "1px solid #e5e5e5",
    boxShadow: "0 10px 45px rgba(38,41,44,.88)",
    boxSizing: "border-box"
  }
};

Modal.setAppElement("#root");

class AddLead extends React.Component {
  constructor() {
    super();

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
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });

    // set first stage as a default
    const { stages } = this.props.leads;
    if (Object.keys(stages).length > 0) this.setState({ stage: stages[0]._id });
  }

  afterOpenModal() {
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
      errors: this.validateDeal(newState)
    });
  }

  validateDeal(deal) {
    let errors = {};
    if (deal.name === "") {
      errors.name = "Name must not be empty";
    }
    if (deal.organization === "" && deal.contact === "") {
      errors.organization = "Organisation or contact must not be empty";
      errors.contact = "Contact or organisation must not be empty";
    }
    return errors;
  }

  onSubmit() {
    // no stage defined
    // if (this.state.stage === "") return;

    this.setState({
      errors: this.validateDeal(this.state),
      validationIsShown: true
    });
    if (this.state.errors === {}) {
      const lead = {
        domain: this.props.auth.domainid,
        owner: this.props.auth.userid,
        stage: this.state.stage,
        name: this.state.name,
        contact: this.state.contact,
        organization: this.state.organization,
        order: "10"
      };

      this.props.createLead(lead);
      this.closeModal();
    }
  }

  render() {
    const { errors, validationIsShown } = this.state;
    return (
      <div>
        <div id="tool-panel">
          <button type="button" className="btn btn-success tool-panel__button" onClick={this.openModal}>
            Add a lead
          </button>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
        >
          <div className="">
            <header className="AppLead-form-header">Add deal
            </header>
            <button type="button"
                    onClick={this.closeModal}
                    aria-label="Close"
                    className="AppLead-modal-close"
            >
              <span aria-hidden="true"
                    className="close AppLead-modal-icon"
              >&times;</span>
            </button>
          </div>
          <div className="">
            <form
              autoComplete="off"
              className="AppLead-form"
            >
              <label className="AppLead-input-label">
                Contact person name
              </label>
              <div className={classNames("AppLead-input-container",
                { "AppLead-input-invalid": validationIsShown && errors.contact })}
              >
                <i className="fas fa-user AppLead-input-icon"/>
                <input
                  name="contact"
                  type="text"
                  className="AppLead-form-input"
                  onChange={this.onChange}
                />
              </div>

              <label className="AppLead-input-label">
                Organization name
              </label>
              <div className={classNames("AppLead-input-container",
                { "AppLead-input-invalid": validationIsShown && errors.organization })}>
                <i className="fas fa-building AppLead-input-icon"/>
                <input
                  name="organization"
                  type="text"
                  className="AppLead-form-input"
                  onChange={this.onChange}
                />
              </div>

              <label className="AppLead-input-label">
                Deal title
              </label>
              <div className={classNames("AppLead-input-container",
                { "AppLead-input-invalid": validationIsShown && errors.name })}>
                <input
                  name="name"
                  type="text"
                  className="AppLead-form-input"
                  onChange={this.onChange}
                />
              </div>
              <label className="AppLead-input-label">Pipeline Stage</label>
            </form>
          </div>
          <div className="AppLead-form-footer">
            <button type="button" className="btn btn-success AppLead-btn-save"
                    onClick={this.onSubmit}
            >
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

export default connect(
  mapStateToProps,
  { createLead }
)(AddLead);

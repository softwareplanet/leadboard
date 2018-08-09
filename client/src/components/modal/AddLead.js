import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead, loadLeadboard } from "../../actions/leadActions";
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

      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.dealForm = React.createRef();
  }

  openModal() {
    this.setState({ modalIsOpen: true });

    // set first stage as a default
    const { stages } = this.props.leads;
    if (Object.keys(stages).length > 0) this.setState({ stage: stages[0]._id });
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    // no stage defined
    if (this.state.stage === "") return;

    const lead = {
      name: this.state.name,
      stage: this.state.stage,
      owner: this.props.auth.userid,
      order: "10"
    };

    this.props.createLead(lead).then(result => {
      this.closeModal();
    });
  }

  render() {
    const { stages } = this.props.leads;
    const stageList = stages.map(stage => (
      <option key={stage._id} value={stage._id}>
        {stage.name}
      </option>
    ));
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
          onRequestClose={this.closeModal}
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
              className="AppLead-form"
              onSubmit={this.onSubmit}
              ref={this.dealForm}
            >
              <label className="AppLead-input-label">
                Contact person name
              </label>
              <div className="AppLead-input-container">
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
              <div className="AppLead-input-container">
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
              <div className="AppLead-input-container">
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
                    onClick={() => this.dealForm.submit}
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
  loadLeadboard: PropTypes.func.isRequired,
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
  { createLead, loadLeadboard }
)(AddLead);

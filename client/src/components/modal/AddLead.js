import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../../actions/leadActions";
import classNames from "classnames";
import "./AddLead.css";
import {isEmpty} from "lodash";

const customStyles = {
  content: {
    top: "16%",
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

  validateDeal(lead) {
    let errors = {};
    if (lead.name === "") {
      errors.name = "Name must not be empty";
    }
    if (lead.organization === "" && lead.contact === "") {
      errors.organization = "Organisation or contact must not be empty";
      errors.contact = "Contact or organisation must not be empty";
    }
    return errors;
  }

  onSubmit() {
    // no stage defined
    // if (this.state.stage === "") return;
    this.setState({
      validationIsShown: true
    });

    let errors = this.validateDeal(this.state);
    if (isEmpty(errors)) {
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
    } else {
      this.setState({ errors: errors });
    }
  }

  render() {
    // const { stages } = this.props.leads;
    // const stageList = stages.map(stage => (
    //   <option key={stage._id} value={stage._id}>
    //     {stage.name}
    //   </option>
    // ));
    const { errors, validationIsShown } = this.state;
    return (
      <div>
        <div id="tool-panel">
          <button type="button" className="AppLead__btn AppLead__btn-green tool-panel__button" onClick={this.openModal}>
            Add lead
          </button>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
        >
          <div className="">
            <header className="AppLead__form_header">Add lead
            </header>
            <button type="button"
                    onClick={this.closeModal}
                    aria-label="Close"
                    className="AppLead__modal_btn-close"
            >
              <span aria-hidden="true"
                    className="close AppLead__icon-close"
              >&times;</span>
            </button>
          </div>
          <div className="">
            <form
              autoComplete="off"
              className="AppLead__form"
            >
              <label className="AppLead__input_label">
                Contact person name
              </label>
              <div className={classNames("AppLead__input_container",
                { "AppLead__input_container-invalid": validationIsShown && errors.contact })}
              >
                <i className="fas fa-user AppLead__input_icon"/>
                <input
                  name="contact"
                  type="text"
                  className="AppLead__form_input"
                  onChange={this.onChange}
                />
              </div>

              <label className="AppLead__input_label">
                Organization name
              </label>
              <div className={classNames("AppLead__input_container",
                { "AppLead__input_container-invalid": validationIsShown && errors.organization })}>
                <i className="fas fa-building AppLead__input_icon"/>
                <input
                  name="organization"
                  type="text"
                  className="AppLead__form_input"
                  onChange={this.onChange}
                />
              </div>

              <label className="AppLead__input_label">
                Lead title
              </label>
              <div className={classNames("AppLead__input_container",
                { "AppLead__input_container-invalid": validationIsShown && errors.name })}>
                <input
                  name="name"
                  type="text"
                  className="AppLead__form_input"
                  onChange={this.onChange}
                />
              </div>
              {/*<label className="AppLead__input_label">Pipeline Stage</label>*/}
              {/*<select name="stage" onChange={this.onChange}>*/}
                {/*{stageList}*/}
              {/*</select>*/}
            </form>
          </div>
          <div className="AppLead__form_footer">
            <button type="button" className="AppLead__btn AppLead__btn-green AppLead__btn-save"
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

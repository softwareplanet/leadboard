import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLead } from "../../actions/leadActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class AddLead extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      stage: "",
      errors: {},

      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });

    // set first stage as a default
    const { stages } = this.props.leads;
    if (Object.keys(stages).length > 0) this.setState({ stage: stages[0]._id });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
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
    if (this.state.stage == "") return;

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
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Add a lead<a href="#" onClick={this.closeModal}>
              X
            </a>
          </h2>

          <form onSubmit={this.onSubmit}>
            <div>Title</div>
            <input name="name" type="text" onChange={this.onChange} />
            <div>Stage</div>
            <select name="stage" onChange={this.onChange}>
              {stageList}
            </select>
            <div>
              <button>Add Lead</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

/* 
loadLeadboard.propTypes = {
  loadLeadboard: PropTypes.func.isRequired,
  leads: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired
};
*/

const mapStateToProps = state => ({
  leads: state.leads,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createLead }
)(AddLead);

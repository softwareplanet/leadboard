import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead } from "../../../actions/leadActions";
import "./EditLeadHeader.css";

class EditLeadHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editLead = this.props.leads.editLead ? this.props.leads.editLead : null;
    return (
      <div className="edit-lead-header">
        <div className={"edit-lead-header-description"}> </div>
        <h4>{editLead ? editLead.name : null} lead</h4>
        <div className={"edit-lead-header-main"}>
          <h4>{editLead ? editLead.price : null} </h4>
          <div>{editLead ? editLead.contact.name : null}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let leadId = this.props.match.params.id;
    this.props.loadLead(leadId);
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead }
)(EditLeadHeader);

import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead } from "../../../actions/leadActions";
import "./EditLeadHeader.css";

class EditLeadHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="edit-lead-header">
        <div className={"edit-lead-header-description"}> </div>
        <h4>{this.props.leads.editLead ? this.props.leads.editLead.name : null}</h4>

        <div className={"edit-lead-header-main"} />
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

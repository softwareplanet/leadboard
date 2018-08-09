import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead } from "../../../actions/leadActions";
import "./EditLeadHeader.css";
import EditLeadStageProgress from "./editLeadStageList/EditLeadStageProgress";

class EditLeadHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editLead = this.props.leads.editLead ? this.props.leads.editLead : null;
    return (
      <div className="edit-lead-header">
        <div className={"edit-lead-header-description"}>
          <h4>{editLead ? editLead.name : null} lead</h4>
          <h4 className={"edit-lead-header-owner"}>
            {editLead ? editLead.owner.firstname + " " + editLead.owner.lastname : null}
          </h4>
        </div>
        <div className={"edit-lead-header-main"}>
          <h4>{editLead ? editLead.price : null} </h4>
          <EditLeadStageProgress />
        </div>
      </div>
    );
  }

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    let funnelId = this.props.match.params.funnelId;
    this.props.loadLead(leadId, funnelId);
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

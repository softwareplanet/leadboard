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
      <div className="EditLeadHeader">
        <div className={"EditLeadHeader__description"}>
          <h4>{editLead ? editLead.name : null} lead</h4>
          <div className={"EditLeadHeader__owner"}>
            <img src={'https://webapp.pipedriveassets.com/images/icons/profile_120x120.svg'} className={'EditLeadHeader__owner-picture rounded-circle'}/>
            <div className={'EditLeadHeader__owner-body'}>
              <span>{editLead ? editLead.owner.firstname + " " + editLead.owner.lastname : null}</span>
              <small className={'text-muted'}>Owner</small>
            </div>
          </div>
        </div>
        <div className={"EditLeadHeader__main"}>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead } from "../../../actions/leadActions";
import "./EditLeadHeader.css";
import EditLeadStageProgress from "./editLeadStageList/EditLeadStageProgress";
import dropDownIcon from '../../../img/drop-down-arrow.svg'
import EditLeadPopover from './editLeadPopover/EditLeadPopover'
import { OverlayTrigger } from "react-bootstrap";

class EditLeadHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editLead = this.props.leads.editLead ? this.props.leads.editLead : null;
    return (
      <div className="EditLeadHeader">
        <div className={"EditLeadHeader__description"}>
          <div className={'position-relative'}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            container={this}
            overlay={
              <EditLeadPopover
                data={editLead ? editLead.name : ''}
                onSave={this.onLeadNameSave}
              />
            }>
            <h4
              className={'EditLeadHeader__lead-name--hover EditLeadHeader__lead-name'}>
              {editLead ? editLead.name : null} lead
            </h4>
          </OverlayTrigger>
          </div>
          <div className={"EditLeadHeader__owner"}>
            <img
              src={'https://webapp.pipedriveassets.com/images/icons/profile_120x120.svg'}
              className={'EditLeadHeader__owner-picture rounded-circle'}
            />
            <div className={'EditLeadHeader__owner-body'}>
              <span>{editLead ? editLead.owner.firstname + " " + editLead.owner.lastname : null}</span>
              <small className={'text-muted'}>Owner</small>
            </div>
            <img className={'EditLeadHeader__dropdown-icon'} src={dropDownIcon} />
          </div>
        </div>
        <div className={"EditLeadHeader__main"}>
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

  onLeadNameSave() {

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

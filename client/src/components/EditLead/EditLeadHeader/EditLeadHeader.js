import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead } from "../../../actions/leadActions";
import styles from "./EditLeadHeader.css";
import EditLeadStageProgress from "./EditLeadStageList/EditLeadStageProgress";
import dropDownIcon from "../../../img/drop-down-arrow.svg";
import EditLeadPopover from "./EditLeadPopover/EditLeadPopover";
import { setEditFunnel } from "../../../actions/leadActions";
import classNames from "classnames";

class EditLeadHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    let editLead = this.props.leads.editLead ? this.props.leads.editLead : null;
    return (
      <div className={styles.header}>
        <div className={styles.description}>
          <h4 onClick={this.toggle} className={styles.leadName} id="edit-lead-header-name">
            {editLead ? editLead.name : null} lead
          </h4>
          <EditLeadPopover
            onSave={this.onLeadNameSave}
            data={this.props.leads.editLead ? this.props.leads.editLead.name : null}
            isOpen={this.state.popoverOpen}
            target="edit-lead-header-name"
            toggle={this.toggle}
            title={`Edit lead's name`}
          />
          <div className={styles.owner}>
            <img
              src={"https://webapp.pipedriveassets.com/images/icons/profile_120x120.svg"}
              className={classNames(styles.ownerPicture, "rounded-circle")}
            />
            <div className={styles.ownerBody}>
              <span>{editLead ? editLead.owner.firstname + " " + editLead.owner.lastname : null}</span>
              <small className={"text-muted"}>Owner</small>
            </div>
            <img className={styles.dropdownIcon} src={dropDownIcon} />
          </div>
        </div>
        <div>
          <EditLeadStageProgress />
        </div>
      </div>
    );
  }

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    let funnelId = this.props.match.params.funnelId;
    this.props.loadLead(leadId, funnelId);
    this.props.setEditFunnel(funnelId);
  }

  onLeadNameSave() {}
}

const mapStateToProps = state => ({
  leads: state.leads
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead, setEditFunnel }
)(EditLeadHeader);

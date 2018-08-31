import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLead } from "../../leadActions";
import styles from "./EditLeadHeader.css";
import EditLeadStageProgress from "./EditLeadStageProgress/EditLeadStageProgress";
import EditLeadPopover from "./EditLeadPopover/EditLeadPopover";
import ownerIcon from "../../../../assets/user-icon.svg";
import { isEmpty }from "lodash";
import { WON, LOST, IN_PROGRESS } from "../../../../constants";

class EditLeadHeader extends Component {
  state = {
    popoverOpen: false
  };

  togglePopover = () => {
    this.setState(prevState => {
      return { popoverOpen: !prevState.popoverOpen };
    });
  };

  statusChangeHandler = (status) => {
    let lead = this.props.editLead;
    lead.status = status;
    this.props.updateLead(lead);  
  }

  render() {
    let editLead = !isEmpty( this.props.editLead ) ? this.props.editLead : null;
    let statusBadge = (
      <div className={editLead && editLead.status === WON ? styles.badge : styles.lostBadge}> 
        {editLead ? editLead.status.toUpperCase() : ""}
      </div>
    )
    return (
      <div className={styles.header}>
        <div className={styles.description}>
          <h4 onClick={this.togglePopover} className={styles.leadName} id="edit-lead-header-name">
            {editLead ? editLead.name : null}
          </h4>
          <EditLeadPopover
            onSave={this.onLeadNameSave}
            onCancel={this.onPopoverCancel}
            value={editLead ? editLead.name : null}
            isOpen={this.state.popoverOpen}
            target="edit-lead-header-name"
            toggle={this.togglePopover}
            title="Rename this lead:"
          />
          <div className={styles.leadOptions}>
            <div className={styles.owner}>
              <img src={ownerIcon} className={styles.ownerPicture} />
              <div className={styles.ownerBody}>
                <span>{editLead ? editLead.owner.firstname + " " + editLead.owner.lastname : null}</span>
                <small className={styles.ownerRole}>Owner</small>
              </div>
            </div>
            <div className={styles.leadActions}>
              {editLead && editLead.status !== IN_PROGRESS ? statusBadge : ""}
              <button onClick={() => this.statusChangeHandler(WON)} className={styles.button}>Won</button>
              <button onClick={() => this.statusChangeHandler(LOST)} className={styles.buttonLost}>Lost</button>
            </div>
          </div>
        </div>
        <div>
          <EditLeadStageProgress id={ this.props.match.params.leadId }/>
        </div>
      </div>
    );
  }

  onLeadNameSave = name => {
    let lead = this.props.editLead;
    lead.name = name;
    this.props.updateLead(lead);
    this.togglePopover();
  };

  onPopoverCancel = () => {
    this.togglePopover();
  };
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead.lead
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { updateLead }
)(EditLeadHeader);

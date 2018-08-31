import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLead, updateLead } from "../../leadActions";
import styles from "./EditLeadHeader.css";
import EditLeadStageProgress from "./EditLeadStageProgress/EditLeadStageProgress";
import EditLeadPopover from "./EditLeadPopover/EditLeadPopover";
import ownerIcon from "../../../../assets/user-icon.svg";
import { isEmpty }from "lodash";

class EditLeadHeader extends Component {
  state = {
    popoverOpen: false
  };

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    this.props.loadLead(leadId);
  }

  toggle = () => {
    this.setState(prevState => {
      return { popoverOpen: !prevState.popoverOpen };
    });
  };

  render() {
    let editLead = !isEmpty( this.props.editLead ) ? this.props.editLead : null;
    return (
      <div className={styles.header}>
        <div className={styles.description}>
          <h4 onClick={this.toggle} className={styles.leadName} id="edit-lead-header-name">
            {editLead ? editLead.name : null}
          </h4>
          <EditLeadPopover
            onSave={this.onLeadNameSave}
            onCancel={this.onPopoverCancel}
            value={editLead ? editLead.name : null}
            isOpen={this.state.popoverOpen}
            target="edit-lead-header-name"
            toggle={this.toggle}
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
            <div>
              <button className={styles.button}>Won</button>
              <button className={styles.buttonLost}>Lost</button>
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
    this.toggle();
  };

  onPopoverCancel = () => {
    this.toggle();
  };
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead.lead
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead, updateLead }
)(EditLeadHeader);

import { isEmpty }from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import ownerIcon from '../../../../assets/user-icon.svg';
import { IN_PROGRESS, LOST, WON } from '../../../../constants';
import Lead from '../../../../models/Lead';
import { deleteLead, loadLead, updateLead } from '../../leadActions';
import { loadLeadActivities } from '../Activities/activityActions';
import AdditionalActionsPopover from './AdditionalActionsPopover/AdditionalActionsPopover';
import * as styles from './EditLeadHeader.css';
import EditLeadPopover from './EditLeadPopover/EditLeadPopover';
import EditLeadStageProgress from './EditLeadStageProgress/EditLeadStageProgress';

interface Props {
  match: any;
  editLead: Lead;

  deleteLead(leadId: string): void;

  loadLeadActivities(leadId: string): void;

  updateLead(lead: Lead): void;
}

interface State {
  isEditNamePopoverOpen: boolean;
  isAdditionalActionsPopoverOpen: boolean;
}

class EditLeadHeader extends React.Component<Props, State> {
  public state: State = {
    isAdditionalActionsPopoverOpen: false,
    isEditNamePopoverOpen: false,
  };

  public componentDidMount() {
    const leadId = this.props.match.params.leadId;
    this.props.loadLeadActivities(leadId);
  }

  public render() {
    const editLead = !isEmpty( this.props.editLead ) ? this.props.editLead : null;
    const statusStyle = (editLead && editLead.status === WON) ? styles.badge : styles.lostBadge;
    const closedLeadActions = (
      <div className={styles.closedLeadActions}>
        <div className={statusStyle}> 
          {editLead ? editLead.status.toUpperCase() : ''}
        </div>
        <button
          className={styles.reopenButton}
          onClick={this.handleStatusChange.bind(this, IN_PROGRESS)}
        >
          Reopen
        </button>
      </div>
    );

    const inProgressLeadActions = (
      <div>
        <button
          onClick={this.handleStatusChange.bind(this, WON)}
          className={styles.button}
        >
          Won
        </button>
        <button
          onClick={this.handleStatusChange.bind(this, LOST)}
          className={styles.buttonLost}
        >
          Lost
        </button>
      </div>
    );

    return (
      <div className={styles.header}>
        <div className={styles.description}>
          <h4
            onClick={this.toggleEditNamePopover}
            className={styles.leadName}
            id="edit-lead-header-name"
          >
            {editLead ? editLead.name : null}
          </h4>
          <EditLeadPopover
            onSave={this.handleLeadNameSave}
            onCancel={this.handlePopoverCancel}
            value={editLead ? editLead.name : null}
            isOpen={this.state.isEditNamePopoverOpen}
            target="edit-lead-header-name"
            toggle={this.toggleEditNamePopover}
            title="Rename this lead:"
          />
          <div className={styles.leadOptions}>
            <div className={styles.owner}>
              <img src={ownerIcon} className={styles.ownerPicture} />
              <div className={styles.ownerBody}>
                <span>{editLead ? editLead.owner.firstname + '' + editLead.owner.lastname : null}</span>
                <small className={styles.ownerRole}>Owner</small>
              </div>
            </div>

            <div className={styles.leadActions}>
              {editLead && editLead.status !== IN_PROGRESS ? closedLeadActions : inProgressLeadActions}
              <button
                id="btnAdditionalActions"
                className={styles.btnAdditionalActions}
                onClick={this.toggleAdditionalActionsPopover}
              >
                <i className="fas fa-ellipsis-h" />
              </button>
              <AdditionalActionsPopover
                deleteLead={this.props.deleteLead}
                isOpen={this.state.isAdditionalActionsPopoverOpen}
                leadId={this.props.editLead._id}
                target="btnAdditionalActions"
                toggle={this.toggleAdditionalActionsPopover}
              />
            </div>
          </div>
        </div>
        <div>
          <EditLeadStageProgress />
        </div>
      </div>
    );
  }

  private toggleEditNamePopover = () => {
    this.setState(prevState => {
      return { isEditNamePopoverOpen: !prevState.isEditNamePopoverOpen };
    });
  };

  private toggleAdditionalActionsPopover = () => {
    this.setState(prevState => {
      return { isAdditionalActionsPopoverOpen: !prevState.isAdditionalActionsPopoverOpen };
    });
  };

  private handleStatusChange = (status: string) => {
    const lead = this.props.editLead;
    lead.status = status;
    this.props.updateLead(lead);
  };

  private handleLeadNameSave = (name: string) => {
    const lead = this.props.editLead;
    lead.name = name;
    this.props.updateLead(lead);
    this.toggleEditNamePopover();
  };

  private handlePopoverCancel = () => {
    this.toggleEditNamePopover();
  };
}

const mapStateToProps = (state: any) => ({
  editLead: state.leads.editLead.lead,
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead, updateLead, deleteLead, loadLeadActivities },
)(EditLeadHeader);

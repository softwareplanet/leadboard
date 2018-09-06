import { isEmpty }from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import ownerIcon from '../../../../assets/user-icon.svg';
import { IN_PROGRESS, LOST, WON } from '../../../../constants';
import Lead from '../../../../models/Lead';
import { loadLead, updateLead } from '../../leadActions';
import { loadLeadActivities } from '../Activities/activityActions';
import * as styles from './EditLeadHeader.css';
import EditLeadPopover from './EditLeadPopover/EditLeadPopover';
import EditLeadStageProgress from './EditLeadStageProgress/EditLeadStageProgress';

interface Props {
  match: any;
  editLead: Lead;
  loadLeadActivities(leadId: string): void;
  updateLead(lead: Lead): void;
}

interface State {
  isPopoverOpen: boolean;
}

class EditLeadHeader extends React.Component<Props, State> {
  public state: State = {
    isPopoverOpen: false
  };

  public componentDidMount() {
    const leadId = this.props.match.params.leadId;
    this.props.loadLeadActivities(leadId);
  }

  public render() {
    const editLead = !isEmpty( this.props.editLead ) ? this.props.editLead : null;
    const statusBadge = (
      <div className={
        (editLead && editLead.status === WON) 
        ? styles.badge 
        : styles.lostBadge 
      }
      > 
        {editLead ? editLead.status.toUpperCase() : ''}
      </div>
    );
    return (
      <div className={styles.header}>
        <div className={styles.description}>
          <h4 onClick={this.togglePopover} className={styles.leadName} id="edit-lead-header-name">
            {editLead ? editLead.name : null}
          </h4>
          <EditLeadPopover
            onSave={this.handleLeadNameSave}
            onCancel={this.handlePopoverCancel}
            value={editLead ? editLead.name : null}
            isOpen={this.state.isPopoverOpen}
            target="edit-lead-header-name"
            toggle={this.togglePopover}
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
              {editLead && editLead.status !== IN_PROGRESS ? statusBadge : ''}
              <button 
                onClick={() => this.handleStatusChange(WON)} 
                className={styles.button}
              >
                Won
              </button>
              <button 
                onClick={() => this.handleStatusChange(LOST)} 
                className={styles.buttonLost}
              >
                Lost
              </button>
            </div>
          </div>
        </div>
        <div>
          <EditLeadStageProgress />
        </div>
      </div>
    );
  }

  private togglePopover = () => {
    this.setState(prevState => {
      return { isPopoverOpen: !prevState.isPopoverOpen };
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
    this.togglePopover();
  };

  private handlePopoverCancel = () => {
    this.togglePopover();
  };
}

const mapStateToProps = (state: any) => ({
  editLead: state.leads.editLead.lead
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead, updateLead, loadLeadActivities }
)(EditLeadHeader);

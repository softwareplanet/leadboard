import { isEmpty }from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import pipelineArrow from '../../../../assets/img/pipeline-stage-arrow.svg';
import ownerIcon from '../../../../assets/img/user-icon.svg';
import { IN_PROGRESS, LOST, WON } from '../../../../constants';
import Funnel from '../../../../models/Funnel';
import { deleteLead, loadFunnels, loadLead, loadStagesWithoutLeads, updateLead } from '../../leadActions';
import { loadLeadActivities } from '../Activities/activityActions';
import AdditionalActionsPopover from './AdditionalActionsPopover/AdditionalActionsPopover';
import EditLeadFieldPopover from './EditLeadFieldPopover/EditLeadFieldPopover';
import * as styles from './EditLeadHeader.css';
import EditLeadPipelinePopover from './EditLeadPipelinePopover/EditLeadPipelinePopover';
import EditLeadStageProgress from './EditLeadStageProgress/EditLeadStageProgress';

const PIPELINE_POPOVER_ID: string = 'pipelineTarget';

interface Props {
  match: any;
  editLead: any;
  funnels: Funnel[];

  deleteLead(leadId: string): void;

  loadLeadActivities(leadId: string): void;

  updateLead(lead: any): void;

  loadFunnels(): void;

  loadStagesWithoutLeads(funnelId: string): void;
}

interface State {
  isFieldPopoverOpen: boolean;
  isPipelinePopoverOpen: boolean;
  isAdditionalActionsPopoverOpen: boolean;
}

class EditLeadHeader extends React.Component<Props, State> {
  public state: State = {
    isAdditionalActionsPopoverOpen: false,
    isFieldPopoverOpen: false,
    isPipelinePopoverOpen: false,
  };

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
          <h4 onClick={this.toggleFieldPopover} className={styles.leadName} id="edit-lead-header-name">
            {editLead ? editLead.name : null}
          </h4>
          <EditLeadFieldPopover
            onSave={this.handleLeadNameSave}
            onCancel={this.handlePopoverCancel}
            value={editLead ? editLead.name : null}
            isOpen={this.state.isFieldPopoverOpen}
            target="edit-lead-header-name"
            toggle={this.toggleFieldPopover}
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
            {this.props.editLead.stage 
              ? (
                  <div 
                    onClick={this.togglePipelinePopover} 
                    id={PIPELINE_POPOVER_ID} 
                    className={styles.bottomStageStatus}
                  >
                    {this.props.editLead.stage.funnel.name} 
                    <ReactSVG className={styles.pipelineArrowSvg} src={pipelineArrow} /> 
                    {this.props.editLead.stage.name}
                    <EditLeadPipelinePopover
                      isOpen={this.state.isPipelinePopoverOpen}
                      target={PIPELINE_POPOVER_ID}
                      toggle={this.togglePipelinePopover}
                    />
                  </div>
                )
              : ''}
        </div>
      </div>
    );
  }

  public componentWillMount() {
    const leadId = this.props.match.params.leadId;
    this.props.loadLeadActivities(leadId);
    this.props.loadFunnels();
  }

  private toggleFieldPopover = () => {
    this.setState(prevState => {
      return { isFieldPopoverOpen: !prevState.isFieldPopoverOpen };
    });
  }

  private toggleAdditionalActionsPopover = () => {
    this.setState(prevState => {
      return { isAdditionalActionsPopoverOpen: !prevState.isAdditionalActionsPopoverOpen };
    });
  }

  private togglePipelinePopover = () => {
    this.setState(prevState => {
      return { isPipelinePopoverOpen: !prevState.isPipelinePopoverOpen };
    });
  }

  private handleStatusChange = (status: string) => {
    this.props.updateLead({ _id: this.props.editLead._id, status });  
  }

  private handleLeadNameSave = (name: string) => {
    this.props.updateLead({ _id: this.props.editLead._id, name });
    this.toggleFieldPopover();
  }

  private handlePopoverCancel = () => {
    this.toggleFieldPopover();
  }
}

const mapStateToProps = (state: any) => ({
  editLead: state.dashboard.editLead.lead,
  funnels: state.dashboard.funnels,
});

export { EditLeadHeader };

export default connect(
  mapStateToProps,
  { loadLead, updateLead, loadLeadActivities, loadFunnels, loadStagesWithoutLeads, deleteLead },
)(EditLeadHeader);

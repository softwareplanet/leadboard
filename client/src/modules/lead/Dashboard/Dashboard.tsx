import * as fp from 'lodash/fp';
import * as moment from 'moment';
import * as React from 'react';
import * as styles from './Dashboard.css';

import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import LeadModel from '../../../models/Lead';
import Stage from '../../../models/Stage';
import { loadFirstActivityInLeadsPlan } from '../EditLead/Activities/activityActions';
import { loadLeadboard } from '../leadActions';
import Lead from './Lead/Lead';

interface Props {
  leads: any;
  activities: any;
  loadLeadboard(): void;
  loadFirstActivityInLeadsPlan(): void;
}

interface State {
  leadboardLoaded: boolean;
}

export class Dashboard extends React.Component<Props, State> {
  public state: State = {
    leadboardLoaded: false,
  };

  public componentWillReceiveProps(nextProps: Props) {
    this.loadItems();
  }

  public componentDidMount() {
    this.loadItems();
  }

  public render() {
    const { leads } = this.props;
    const noLeads = this.isStagesEmpty();
    const stages = leads.stages.map((stage: Stage, index: number) => {
      const leadCards = this.createLeadCards(stage._id);

      return (
        <div className={styles.stage} key={stage._id}>
          <div className={noLeads ? styles.emptyStageHead : styles.notEmptyStageHead}>
            <div className={styles.stageContainer}>
              <span>{stage.name}</span>
              <span className={styles.stageValue}>
                {Array.isArray(leadCards) && leadCards.length > 0 ? (
                  <small className={styles.stageValueSmall}>
                    {leadCards.length} {leadCards.length === 1 ? 'lead' : 'leads'}
                  </small>
                ) : null}
              </span>
            </div>
          </div>
          { leadCards }
          <div className={styles.cardTerminator}>{noLeads ? this.createEmptyLeadCards(index) : null}</div>
        </div>
      );
    });

    return <div className={styles.dashboard}>{stages}</div>;
  }

  private isStagesEmpty = () => {
    const leads = this.props.leads.leads;
    const stages = Object.keys(leads).map(value => leads[value]);
    return fp.all(s => s.leads.length === 0, stages);
  };

  private createLeadCards = (stage: string) => {
    if (this.isStageIsUndefined(stage)) {return <div />;}

    return this.props.leads.leads['_' + stage].leads.map((lead: LeadModel) => {
      const status = this.getLeadActivityStatus(lead);
      return <Lead key={lead._id} lead={lead} link={this.leadPath(lead)} activityStatus={status} />;
    });
  };

  private getLeadActivityStatus = (lead: LeadModel) => {
    const leadWithActivities = fp.find(a => a.lead === lead._id, this.props.activities);
    const now = new Date();
    if (!isEmpty(leadWithActivities)) {
      const nearestDate = new Date(leadWithActivities.date);
      if (moment(now).isSame(nearestDate, 'day')) {
        if (leadWithActivities.hasStartTime) {
          if (moment(now).isAfter(nearestDate)) {
            return 'Overdue';
          } else {
            return 'Active';
          }
        }
        return 'Active';
      } else {
        if (moment(now).isAfter(nearestDate)) {
          return 'Overdue';
        } else {
          return 'Planned';
        }
      }
    } else {
      return 'NoActivity';
    }
  };

  private leadPath = (lead: LeadModel) => {
    return `/lead/${lead._id}`;
  };

  private createEmptyLeadCards = (index: number) => {
    const emptyLeads = [];
    for (let i = 0; i < this.props.leads.stages.length - index; i++) {
      emptyLeads.push(<div key={i} className={styles.stagePlaceholder} />);
    }
    return emptyLeads;
  };

  private isStageIsUndefined = (stage: string) => {
    return typeof this.props.leads.leads['_' + stage] === 'undefined';
  };

  private loadItems = () => {
    if (!this.state.leadboardLoaded) {
      this.props.loadLeadboard();
      this.props.loadFirstActivityInLeadsPlan();
      this.setState({ leadboardLoaded: true });
    }
  };
}

const mapStateToProps = (state: any) => ({
  activities: state.leads.activities,
  leads: state.leads,
});

export default connect(
  mapStateToProps,
  { loadLeadboard, loadFirstActivityInLeadsPlan },
)(Dashboard);

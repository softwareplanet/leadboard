import * as fp from 'lodash/fp';
import * as moment from 'moment';
import * as React from 'react';
import * as styles from './Dashboard.css';

import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LeadModel from '../../../models/Lead';
import Stage from '../../../models/Stage';
import { loadFirstActivityInLeadsPlan } from '../EditLead/Activities/activityActions';
import { loadDashboard, setActiveFunnel} from '../leadActions';
import { ACTIVE, NOACTIVITY, OVERDUE, PLANNED } from './activityStatuses';
import Lead from './Lead/Lead';

interface Props extends RouteComponentProps<any> {
  dashboard: any;
  nearestActivities: any;

  loadDashboard(funnelId:string): void;
  setActiveFunnel(): void;
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
    const { dashboard } = this.props;
    const noLeads = this.isStagesEmpty();
    const stages = dashboard.stages.map((stage: Stage, index: number) => {
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
    const leads = this.props.dashboard.leads;
    const stages = Object.keys(leads).map(value => leads[value]);
    return fp.all(s => s.leads.length === 0, stages);
  };

  private createLeadCards = (stage: string) => {
    if (this.isStageIsUndefined(stage)) {return <div />;}

    return this.props.dashboard.leads['_' + stage].leads.map((lead: LeadModel) => {
      const status = this.getLeadActivityStatus(lead);
      return <Lead key={lead._id} lead={lead} link={this.leadPath(lead)} activityStatus={status} />;
    });
  };

  private getLeadActivityStatus = (lead: LeadModel) => {
    const leadWithActivities = fp.find(a => a.lead === lead._id, this.props.nearestActivities);
    const now = new Date();
    if (!isEmpty(leadWithActivities)) {
      const nearestDate = new Date(leadWithActivities.date);
      if (moment(now).isSame(nearestDate, 'day')) {
        if (moment(now).isAfter(nearestDate)) {
          return OVERDUE;
        } else {
          return ACTIVE;
        }
      } else {
        if (moment(now).isAfter(nearestDate)) {
          return OVERDUE;
        } else {
          return PLANNED;
        }
      }
    } else {
      return NOACTIVITY;
    }
  };

  private leadPath = (lead: LeadModel) => {
    return `/lead/${lead._id}`;
  };

  private createEmptyLeadCards = (index: number) => {
    const emptyLeads = [];
    for (let i = 0; i < this.props.dashboard.stages.length - index; i++) {
      emptyLeads.push(<div key={i} className={styles.stagePlaceholder} />);
    }
    return emptyLeads;
  };

  private isStageIsUndefined = (stage: string) => {
    return typeof this.props.dashboard.leads['_' + stage] === 'undefined';
  };

  private loadItems = () => {
    if (!this.state.leadboardLoaded) {
      this.props.setActiveFunnel();

      this.props.loadDashboard(localStorage.getItem('activeFunnelId')!);
      this.props.loadFirstActivityInLeadsPlan();
      this.setState({ leadboardLoaded: true });
    }
  };
}

const mapStateToProps = (state: any) => ({
  dashboard: state.dashboard,
  nearestActivities: state.dashboard.activities,
});

export default connect(
  mapStateToProps,
  { loadDashboard, setActiveFunnel, loadFirstActivityInLeadsPlan },
)(withRouter(Dashboard));

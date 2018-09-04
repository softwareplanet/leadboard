import * as fp from 'lodash/fp';
import * as React from 'react';
import * as styles from './Dashboard.css';

import { connect } from 'react-redux';
import LeadModel from '../../../models/Lead';
import Stage from '../../../models/Stage';
import { loadLeadboard } from '../leadActions';
import Lead from './Lead/Lead';

interface Props {
  leads: any;
  loadLeadboard(): void;
}

interface State {
  leadboardLoaded: boolean;
}

export class Dashboard extends React.Component<Props, State> {
  public state: State = {
    leadboardLoaded: false
  };

  public componentWillReceiveProps(nextProps: Props) {
    this.loadLeads();
  }

  public componentDidMount() {
    this.loadLeads();
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
    if (this.isStageIsUndefined(stage)) { return <div />; }

    return this.props.leads.leads['_' + stage].leads.map((lead: LeadModel) => {
      return <Lead key={lead._id} lead={lead} link={this.leadPath(lead)} />;
    });
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

  private loadLeads = () => {
    if (!this.state.leadboardLoaded) {
      this.props.loadLeadboard();
      this.setState({ leadboardLoaded: true });
    }
  }
}

const mapStateToProps = (state: any) => ({
  leads: state.leads
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(Dashboard);

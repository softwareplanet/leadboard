import * as React from "react";
import * as styles from "./Dashboard.css";
import * as fp from "lodash/fp";

import { connect } from "react-redux";
import { loadLeadboard } from "../leadActions";
import Lead from "./Lead/Lead";
import Stage from "../../../models/Stage";
import ILead from "../../../models/Lead";

interface Props {
  leads: any;
  loadLeadboard(): void;
}

interface State {
  leadboardLoaded: boolean;
}

export class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leadboardLoaded: false
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.state.leadboardLoaded) {
      this.setState({ leadboardLoaded: true });
      this.props.loadLeadboard();
    }
  }

  public render() {
    const { leads } = this.props;
    const noLeads = this.isStagesEmpty();
    let stages = leads.stages.map((stage: Stage, index: number) => {
      let leads = this.createLeadCards(stage._id);

      return (
        <div className={styles.stage} key={stage._id}>
          <div className={noLeads ? styles.emptyStageHead : styles.notEmptyStageHead}>
            <div className={styles.stageContainer}>
              <span>{stage.name}</span>
              <span className={styles.stageValue}>
                {Array.isArray(leads) && leads.length > 0 ? (
                  <small className={styles.stageValueSmall}>
                    {leads.length} {leads.length === 1 ? "lead" : "leads"}
                  </small>
                ) : null}
              </span>
            </div>
          </div>
          {leads}
          <div className={styles.cardTerminator}>{noLeads ? this.createEmptyLeadCards(index) : null}</div>
        </div>
      );
    });

    return <div className={styles.dashboard}>{stages}</div>;
  }

  private isStagesEmpty = () => {
    let stages = Object.values(this.props.leads.leads);
    return fp.all(s => s.leads.length === 0, stages);
  };

  private createLeadCards = (stage: string) => {
    let leads;

    if (this.isStageIsUndefined(stage)) return <div />;

    leads = this.props.leads.leads["_" + stage].leads.map((lead: ILead) => {
      return <Lead key={lead._id} lead={lead} link={this.leadPath(lead)} />;
    });
    return leads;
  };

  private leadPath = (lead: ILead) => {
    return `/lead/${lead._id}`;
  };

  private createEmptyLeadCards = (index: number) => {
    let emptyLeads = [];
    for (let i = 0; i < this.props.leads.stages.length - index; i++) {
      emptyLeads.push(<div key={i} className={styles.stagePlaceholder} />);
    }
    return emptyLeads;
  };

  private isStageIsUndefined = (stage: string) => {
    return typeof this.props.leads.leads["_" + stage] === "undefined";
  };
}

const mapStateToProps = (state: any) => ({
  leads: state.leads
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(Dashboard);

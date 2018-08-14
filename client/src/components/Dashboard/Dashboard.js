import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../../actions/leadActions";
import styles from "./Dashboard.css";

import Lead from "../Lead/Lead";

export class Dashboard extends Component {
  constructor() {
    super();

    this.leadboardLoaded = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leads) {
      this.setState({ leads: nextProps.leads });
    }

    if (nextProps.auth.domainid) {
      // reload dashboard if page was reloaded
      if (!this.leadboardLoaded) {
        this.leadboardLoaded = true;
        this.props.loadLeadboard(nextProps.auth.domainid);
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.domainid) {
      this.leadboardLoaded = true;
      this.props.loadLeadboard(this.props.auth.domainid);
    }
  }

  isStagesEmpty = () => {
    let isEmpty = true;
    let stagesArray = Object.values(this.props.leads.leads);
    stagesArray.forEach(stage => {
      if (stage.leads.length !== 0)
        isEmpty = false;
    });
    return isEmpty;
  };

  createLeadCards = stage => {
    let leads;

    if (this.isStageIsUndefined(stage))
      return <div/>;

    leads = this.props.leads.leads["_" + stage].leads.map(lead => {
      return <Lead key={lead._id} lead={lead}
                   link={`/funnel/${
                     this.props.leads.funnels && this.props.leads.funnels.length > 0 ?
                       this.props.leads.funnels[0]._id :
                       0
                     }/lead/${lead._id}`}/>;
    });
    return leads;
  };

  createEmptyLeadCards = (index) => {
    let emptyLeads = [];
    for (let i = 0; i < this.props.leads.stages.length - index; i++) {
      emptyLeads.push(<div key={i} className={styles.stagePlaceholder}/>);
    }
    return emptyLeads;
  };

  isStageIsUndefined = (stage) => {
    return typeof this.props.leads.leads["_" + stage] === "undefined";
  };

  render() {
    const noLeads = this.isStagesEmpty();
    let stages = this.props.leads.stages.map((stage, index) => {
      let leads = this.createLeadCards(stage._id);

      return (
        <div className={styles.stage} key={stage._id}>
          <div className={noLeads ? styles.emptyStageHead :  styles.notEmptyStageHead}>
            <div className={styles.stageContainer}>
              <span>{stage.name}</span>
              {
                leads.length === 0 || !Array.isArray(leads) ? <span className={styles.stageValue}/> : (
                  <span className={styles.stageValue}>
                    <small className={styles.stageValueSmall}>{leads.length} {leads.length === 1 ? "lead" : "leads"}</small>
                  </span>
                )
              }
            </div>
          </div>
          {
            leads
          }
          <div className={styles.cardTerminator}>
            {noLeads ? this.createEmptyLeadCards(index) : <div/>}
          </div>
        </div>
      );
    });

    return <div className={styles.dashboard}>{stages}</div>;
  }
}

Dashboard.propTypes = {
  loadLeadboard: PropTypes.func.isRequired,
  leads: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(Dashboard);

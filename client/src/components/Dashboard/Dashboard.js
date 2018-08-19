import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../../actions/leadActions";
import styles from "./Dashboard.css";
import all from "lodash/fp/all";

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
    let stages = Object.values(this.props.leads.leads);
    return all(s => s.leads.length === 0, stages);
  };

  createLeadCards = stage => {
    let leads;

    if (this.isStageIsUndefined(stage)) return <div />;

    leads = this.props.leads.leads["_" + stage].leads.map(lead => {
      return <Lead key={lead._id} lead={lead} link={this.leadPath(lead)} />;
    });
    return leads;
  };

  leadPath = lead => {
    return `/lead/${lead._id}`;
  };

  createEmptyLeadCards = index => {
    let emptyLeads = [];
    for (let i = 0; i < this.props.leads.stages.length - index; i++) {
      emptyLeads.push(<div key={i} className={styles.stagePlaceholder} />);
    }
    return emptyLeads;
  };

  isStageIsUndefined = stage => {
    return typeof this.props.leads.leads["_" + stage] === "undefined";
  };

  render() {
    const noLeads = this.isStagesEmpty();
    let stages = this.props.leads.stages.map((stage, index) => {
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
}

Dashboard.propTypes = {
  loadLeadboard: PropTypes.func.isRequired,
  leads: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadLeadboard }
)(Dashboard);

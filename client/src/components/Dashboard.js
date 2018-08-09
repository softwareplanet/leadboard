import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../actions/leadActions";
import "./Dashboard.css";

import Lead from "./Lead";

class Dashboard extends Component {
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
      return <Lead key={lead._id} lead={{ name: lead.name, company: "SPG_" }}/>;
    });
    return leads;
  };

  createEmptyLeadCards = (stage, index) => {
    let emptyLeads = [];

    for (let i = 0; i < this.props.leads.stages.length - index; i++) {
      emptyLeads.push(<div className="dashboard__stage__empty-card"/>);
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
        <div className="dashboard__stage" key={stage._id}>
          <div className={'dashboard__head' + (noLeads ? ' dashboard__head--no-leads' : '')}>
            <div>
              <span className="stage__name">{stage.name}</span>
              {
                leads.length === 0 || !Array.isArray(leads) ? <span className="stage__value"/> : (
                  <span className="stage__value">
                  <small>{leads.length} {leads.length === 1 ? "lead" : "leads"}</small>
                </span>
                )
              }
            </div>
          </div>
          {
            leads
          }
          <div className="dashboard__stage__card-terminator">{ noLeads ? this.createEmptyLeadCards(stage, index) : <div/> }</div>
        </div>
      );
    });

    return <div className="dashboard">{stages}</div>;
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

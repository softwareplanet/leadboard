import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../../actions/leadActions";
import styles from "./Dashboard.css";

import Lead from "../Lead/Lead";

class Dashboard extends Component {
  constructor() {
    super();

    this.leadboardLoaded = false;
    this.getLeads = this.getLeads.bind(this);
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

  getLeads(stage, this_ = this) {
    if (typeof this_.props.leads.leads["_" + stage] === "undefined") return <div />;
    const leads = this_.props.leads.leads["_" + stage].leads.map(lead => {
      return <Lead key={lead._id} lead={{ name: lead.name, company: "SPG_" }} />;
    });
    return leads;
  }

  leadPath = lead => {
    const funnelId = this.props.leads.funnels[0]._id;
    return `/lead/${lead._id}`;
  };
  render() {
    var stages = this.props.leads.stages.map(function(stage) {
      return (
        <div className={styles.stage} key={stage._id}>
          <div className={styles.head}>{stage.name}</div>
          {this.getLeads(stage._id, this)}
          <div className={styles.cardTerminator} />
        </div>
      );
    }, this);

    return <div className={styles.dashboard}>{stages}</div>;
  }
}

loadLeadboard.propTypes = {
  loadLeadboard: PropTypes.func.isRequired,
  leads: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired
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

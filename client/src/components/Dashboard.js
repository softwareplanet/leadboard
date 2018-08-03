import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeadboard } from "../actions/leadActions";

import Lead from "./Lead";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
    this.getLeads = this.getLeads.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leads) {
      this.setState({ leads: nextProps.leads });
    }
  }

  componentDidMount() {
    this.props.loadLeadboard(this.props.auth.domainid);
  }

  getLeads(stage, this_ = this) {
    if (typeof this_.props.leads.leads["_" + stage] === "undefined") return <div />;
    const leads = this_.props.leads.leads["_" + stage].leads.map(lead => {
      return <Lead lead={{ name: lead.name, company: "SPG" }} key={lead._id} />;
    });

    return leads;
  }

  render() {
    var stages = this.props.leads.stages.map(function(stage) {
      return (
        <div className="dashboard__stage" key={stage._id}>
          <div className="dashboard__head">{stage.name}</div>
          {this.getLeads(stage._id, this)}
        </div>
      );
    }, this);

    return <div className="dashboard">{stages}</div>;
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

import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./editLeadStage/EditLeadStage";
import { updateLead } from "../../../../actions/leadActions";
import "./EditLeadStageProgress.css";

class EditLeadStageProgress extends Component {
  constructor(props) {
    super(props);
    this.onStageClick = this.onStageClick.bind(this);
  }

  onStageClick(stage) {
    let lead = this.props.leads.editLead;
    let funnelId = this.props.leads.editFunnelId;
    lead.stage = lead ? stage : null;
    this.props.updateLead(lead, funnelId);
  }

  render() {
    let stages = this.props.leads.stages.map(stage => {
      let active = stage.order <= this.props.leads.editLead.stage.order;
      return (
        <EditLeadStage onStageClick={this.onStageClick} active={active} stages={this.props.leads.stages} {...stage} />
      );
    });

    return (
      <div>
        <ul className={"EditLeadStageProgress__container"}>{stages}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export default connect(
  mapStateToProps,
  { updateLead }
)(EditLeadStageProgress);

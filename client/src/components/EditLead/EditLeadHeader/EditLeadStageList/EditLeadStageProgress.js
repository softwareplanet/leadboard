import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./EditLeadStage/EditLeadStage";
import { updateLead } from "../../../../actions/leadActions";
import styles from "./EditLeadStageProgress.css";

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
        <EditLeadStage
          onStageClick={this.onStageClick}
          active={active}
          status={this.props.leads.editLead.status}
          stages={this.props.leads.stages}
          stage={stage}
        />
      );
    });

    return (
      <div>
        <ul className={styles.container}>{stages}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export { EditLeadStageProgress };

export default connect(
  mapStateToProps,
  { updateLead }
)(EditLeadStageProgress);

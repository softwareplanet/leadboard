import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./EditLeadStage/EditLeadStage";
import { updateLead } from "../../../../actions/leadActions";
import styles from "./EditLeadStageProgress.css";

class EditLeadStageProgress extends Component {
  onStageClick = stage => {
    let lead = this.props.editLead;
    lead.stage = lead ? stage : null;
    this.props.updateLead(lead);
  };

  render() {
    let stages = this.props.stages.map((stage, index) => {
      let active = stage.order <= this.props.editLead.stage.order;
      let isFirst = index === 0;
      return (
        <EditLeadStage
          key={stage._id}
          onStageClick={this.onStageClick}
          active={active}
          status={this.props.editLead.status}
          stages={this.props.stages}
          stage={stage}
          isFirst={isFirst}
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
  stages: state.leads.stages,
  editLead: state.leads.editLead
});

export { EditLeadStageProgress };

export default connect(
  mapStateToProps,
  { updateLead }
)(EditLeadStageProgress);

import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./EditLeadStage/EditLeadStage";
import { updateLead, loadLead } from "../../../leadActions";
import styles from "./EditLeadStageProgress.css";
import ReactTooltip from "react-tooltip";
import { isEmpty } from "lodash";

class EditLeadStageProgress extends Component {
  onStageClick = stage => {
    let lead = this.props.editLead;
    lead.stage = lead ? stage : null;
    this.props.updateLead(lead);
  };

  componentWillMount() {
    if (!this.props.editLead) {
      this.props.loadLead(this.props.id)
    }
  }

  render() {
    if (!isEmpty(this.props.editLead)) {
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
          <ReactTooltip
              className={styles.keepTooltip}
              delayShow={150}
              delayHide={200}
              place={"bottom"}
              effect="solid"
            />
        </div>
      );
    } else
      return <div />
  }
}

const mapStateToProps = state => ({
  stages: state.leads.stages,
  editLead: state.leads.editLead.lead
});

export { EditLeadStageProgress };

export default connect(
  mapStateToProps,
  { updateLead, loadLead }
)(EditLeadStageProgress);

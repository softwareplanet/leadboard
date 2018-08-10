import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./editLeadStage/EditLeadStage";
import "./EditLeadStageProgress.css";

class EditLeadStageProgress extends Component {
  render() {
    let stages = this.props.leads.stages.map(stage => {
      return <EditLeadStage stages={this.props.leads.stages} {...stage} />;
    });


    return (
      <ul className={"EditLeadStageProgress__container"}>
        {stages}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export default connect(mapStateToProps)(EditLeadStageProgress);

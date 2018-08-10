import React, { Component } from "react";
import { connect } from "react-redux";
import EditLeadStage from "./editLeadStage/EditLeadStage";
import "./EditLeadStageProgress.css";

class EditLeadStageProgress extends Component {
  render() {
    let stages = this.props.leads.stages.map((stage, index) => {
      return <EditLeadStage active={stage.order <= index} stages={this.props.leads.stages} {...stage} />;
    });


    return (

      <div>
        <ul className={"EditLeadStageProgress__container"}>
          {stages}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export default connect(mapStateToProps)(EditLeadStageProgress);

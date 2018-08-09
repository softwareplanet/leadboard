import React, { Component } from "react";
import { connect } from "react-redux";
import "./EditLeadHeader.css";

class EditLeadHeader extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="edit-lead-header">
        <div className={"edit-lead-header-description"} />

        <div className={"edit-lead-header-main"} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export { EditLeadHeader };

export default connect(mapStateToProps)(EditLeadHeader);

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
        <h4>{this.props.leads.editLead ? this.props.leads.editLead.name : null} lead</h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export { EditLeadHeader };

export default connect(mapStateToProps)(EditLeadHeader);

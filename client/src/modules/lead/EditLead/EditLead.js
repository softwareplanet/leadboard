import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import { loadLead } from "../leadActions";
import EditLeadContent from "./EditLeadContent/EditLeadContent";
import { connect } from "react-redux";

class EditLead extends Component {

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    this.props.loadLead(leadId);
  }

  render() {
    const displayFlex = {
      display: "flex"
    };

    return (
      <div>
       <Navbar />
        <div style={displayFlex}>
          <EditLeadHeader match={this.props.match} />
        </div>
        <div style={displayFlex}>
          <EditLeadSidebar />
          <EditLeadContent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead
})

export default connect(mapStateToProps, { loadLead })(EditLead)

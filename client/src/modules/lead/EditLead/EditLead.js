import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import { loadLead } from "../leadActions";
import EditLeadContent from "./EditLeadContent/EditLeadContent";
import { connect } from "react-redux";
import NotFound from "../../common/NotFound/NotFound";
import { loadNotes } from "./EditLeadContent/EditLeadHistory/Notes/noteActions";

class EditLead extends Component {

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    this.props.loadLead(leadId);
    this.props.loadNotes('lead', leadId);
  }

  render() {
    const displayFlex = {
      display: "flex"
    };

    let editLead = (
      <div>
        <div style={displayFlex}>
          <EditLeadHeader match={this.props.match} />
        </div>
        <div style={displayFlex}>
          <EditLeadSidebar />
          <EditLeadContent />
        </div>
      </div>
    );

    return (
      <div>
       <Navbar />
        { this.props.notFound ? <NotFound /> : editLead }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.dashboard.editLead.lead,
  notFound: state.dashboard.editLead.notFound
});

export default connect(mapStateToProps, { loadLead, loadNotes })(EditLead)

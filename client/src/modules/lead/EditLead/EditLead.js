import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import { loadLead } from "../leadActions";
import EditLeadContent from "./EditLeadContent/EditLeadContent";
import { connect } from "react-redux";
import NotFound from "../../common/NotFound/NotFound";

class EditLead extends Component {

  componentDidMount() {
    let leadId = this.props.match.params.leadId;
    this.props.loadLead(leadId);
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
  editLead: state.leads.editLead.lead,
  notFound: state.leads.editLead.notFound
});

export default connect(mapStateToProps, { loadLead })(EditLead)

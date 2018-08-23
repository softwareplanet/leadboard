import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";

import EditLeadContent from "./EditLeadContent/EditLeadContent";

export default class EditLead extends Component {
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

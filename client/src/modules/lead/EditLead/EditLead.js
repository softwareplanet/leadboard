import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import EditLeadTabs from "./EditLeadTabs/EditLeadTabs";

const displayFlex = {
  display: "flex"
};

export default class EditLead extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div style={displayFlex}>
          <EditLeadHeader match={this.props.match} />
        </div>
        <div style={displayFlex}>
          <EditLeadSidebar />
          <EditLeadTabs />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import EditLeadHeader from "./editLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./editLeadSidebar/EditLeadSidebar";
import EditLeadActivity from "./editLeadAcitivity/EditLeadActivity";
import "./EditLead.css";

export default class EditLead extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="edit-lead-container">
          <EditLeadHeader />
        </div>
        <div className="edit-lead-main-container">
          <EditLeadSidebar />
          <EditLeadActivity />
        </div>
      </div>
    );
  }
}

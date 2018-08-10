import React, { Component } from "react";
import "./EditLeadSidebar.css";
import PersonEditCard from "./personEditCard/PersonEditCard";
import OrganizationEditCard from "./organizationEditCard/OrganizationEditCard";

export default class EditLeadSidebar extends Component {
  render() {
    return <div className="edit-lead-sidebar">
        <OrganizationEditCard/>
        <PersonEditCard/>
    </div>;
  }
}

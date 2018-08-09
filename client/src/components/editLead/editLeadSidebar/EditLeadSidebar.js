import React, { Component } from "react";
import "./EditLeadSidebar.css";
import PersonEditCard from "./personEditCard/PersonEditCard";

export default class EditLeadSidebar extends Component {
  render() {
    return <div className="edit-lead-sidebar">EditLeadSidebar
    <PersonEditCard/>
    </div>;
  }
}

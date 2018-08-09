import React, { Component } from "react";
import "./EditLeadSidebar.css";
import PersonEditCard from "./personEditCard/PersonEditCard";
import SideCard from "./SideCard/SideCard";

export default class EditLeadSidebar extends Component {
  render() {
    return <div className="edit-lead-sidebar">
    <PersonEditCard/>
{/*
    <SideCard/>
*/}
    </div>;
  }
}

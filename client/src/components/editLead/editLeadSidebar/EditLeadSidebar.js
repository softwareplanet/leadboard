import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import PersonEditCard from "./personEditCard/PersonEditCard";
import OrganizationEditCard from "./organizationEditCard/OrganizationEditCard";
import EditCard from "./EditCard/EditCard";

export default class EditLeadSidebar extends Component {
  render() {
    return <div className={styles.sidebar}>
        {/*<OrganizationEditCard/>
        <PersonEditCard/>*/}
        <EditCard/>
    </div>;
  }
}

import React, { Component } from "react";
import Navbar from "../../layouts/Navbar/Navbar";
import EditLeadHeader from "./EditLeadHeader/EditLeadHeader";
import EditLeadSidebar from "./EditLeadSidebar/EditLeadSidebar";
import EditLeadContent from "./EditLeadContent/EditLeadContent";
import styles from "./EditLead.css";

export default class EditLead extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className={styles.headerContainer}>
          <EditLeadHeader match={this.props.match} />
        </div>
        <div className={styles.mainContainer}>
          <EditLeadSidebar />
          <EditLeadContent />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import styles from './EditLeadContent.css'
import EditLeadTabs from './EditLeadTabs/EditLeadTabs'

class EditLeadContent extends Component {
  render() {
    return (
      <div className={styles.content}>
        <EditLeadTabs />
      </div>
    )
  }
}
export default EditLeadContent;

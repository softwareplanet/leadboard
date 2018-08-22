import React, { Component } from "react";
import styles from "./EditLeadTabs.css";
import addActivityIcon from "../../../../assets/add-activity.svg";
import takeNotesIcon from "../../../../assets/take-notes.svg";
import { connect } from "react-redux";
import { updateLead } from "../../leadActions";
import EditLeadEditor from "./EditLeadEditor/EditLeadEditor";

class EditLeadTabs extends Component {

  onChange = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  onNoteSave = noteText => {
    let note = {
      text: noteText,
      user: this.props.userId,
    }
    let lead = {...this.props.editLead}
    lead.notes.push(note);
    this.props.updateLead(lead)
  }

  render() {
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem}>
            <img src={takeNotesIcon} className={styles.headerItemIcon} alt="Take note icon"/>
            Take notes
          </li>
          <li className={styles.headerItem}>
            <img src={addActivityIcon} className={styles.headerItemIcon} alt="Add activity icon"/>
            Add activity
          </li>
          <li className={styles.headerItem}></li>{/* Send email */}
          <li className={styles.headerItem}></li>{/* Upload files */}
          <li className={styles.headerItem}></li>{/* Close button */}
        </ul>
        <EditLeadEditor onSave={this.onNoteSave}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
  userId: state.auth.userid
})

export default connect(mapStateToProps, { updateLead })(EditLeadTabs)

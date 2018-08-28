import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

import takeNotesIcon from "../../../../../assets/take-notes/take-notes.svg"
import takeNotesIconActive from "../../../../../assets/take-notes/take-notes-active.svg"
import addActivityIcon from "../../../../../assets/add-activity/add-activity.svg"
import addActivityIconActive from "../../../../../assets/add-activity/add-activity-active.svg"
import { connect } from 'react-redux'
import { createNote } from "../../../leadActions";
import EditLeadEditor from "./EditLeadEditor/EditLeadEditor";
import AddActivity from "./AddActivity/AddActivity";

class EditLeadTabs extends Component {
  state = {
    activeTab: null
  };

  tabHandler = content => {
    this.setState({ activeTab: content });
  };

  onNoteSave = noteText => {
    let note = {
      text: noteText,
      user: this.props.userId,
    }
    this.props.createNote(this.props.editLead._id, note)
  }
  onNoteSave = noteText => {
    let note = {
      text: noteText,
      user: this.props.userId,
    }
    this.props.createNote(this.props.editLead._id, note)
  }

  onCancel = () => {
    this.setState({ activeTab: null })
  }

  isActive = (component) => {
    return (this.state.activeTab ? this.state.activeTab.type : null) === component 
    || this.state.activeTab === null;
  }

  render() {
    let takeNotesCondition = this.isActive(EditLeadEditor);
    let addActivityCondition = this.isActive(AddActivity);
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem} onClick={() => this.tabHandler(<EditLeadEditor onCancel={this.onCancel} onSave={this.onNoteSave}/>)}>
            <img
              src={takeNotesCondition ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li className={styles.headerItem} onClick={() => this.tabHandler(<AddActivity onCancel={this.onCancel} onSave={this.onActivitySave}/>)}>
            <img
              src={addActivityCondition ? addActivityIcon : addActivityIconActive }
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.state.activeTab ? (
          <div className={styles.content}>{this.state.activeTab}</div>
        ) : (
          <div className={styles.fakeInput} onClick={() => this.tabHandler(<EditLeadEditor onCancel={this.onNoteCancel} onSave={this.onNoteSave}/>)}>Click here to take notes...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
  userId: state.auth.userid
})

export { EditLeadTabs }

export default connect(mapStateToProps, { createNote })(EditLeadTabs)

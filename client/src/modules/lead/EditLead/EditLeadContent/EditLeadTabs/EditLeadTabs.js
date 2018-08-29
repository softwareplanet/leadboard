import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

import takeNotesIcon from "../../../../../assets/take-notes/take-notes.svg"
import takeNotesIconActive from "../../../../../assets/take-notes/take-notes-active.svg"
import addActivityIcon from "../../../../../assets/add-activity/add-activity.svg"
import addActivityIconActive from "../../../../../assets/add-activity/add-activity-active.svg"
import { connect } from 'react-redux'
import { createNote } from "../../../leadActions";
import { createActivity } from "../../Activities/activityActions"
import EditLeadEditor from "./EditLeadEditor/EditLeadEditor";
import AddActivity from "./AddActivity/AddActivity";
import isBlank from '../../../../../utils/isBlank'

class EditLeadTabs extends Component {
  state = {
    activeTab: null,
    showFakeInput: true
  };

  tabHandler = content => {
    this.setState({ activeTab: content, showFakeInput: false });
  };

  onNoteSave = noteText => {
    let note = {
      text: noteText,
      user: this.props.userId,
    }
    this.props.createNote(this.props.editLead._id, note)
  }
  onActivitySave = activity => {
    this.props.createActivity(activity)
  }

  onCancel = () => {
    this.setState({ showFakeInput: true })
  }

  isActive = (component) => {
    return (this.state.activeTab ? this.state.activeTab.type : null) === component;
  }

  render() {
    const noteEditor = <EditLeadEditor onCancel={this.onCancel} onSave={this.onNoteSave} />;
    const addActivity = <AddActivity onCancel={this.onCancel} onSave={this.onActivitySave} />;

    let takeNotesCondition = this.isActive(EditLeadEditor);
    let addActivityCondition = this.isActive(AddActivity);
    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li className={styles.headerItem} onClick={() => this.tabHandler(noteEditor)}>
            <img
              src={(takeNotesCondition || isBlank(this.state.activeTab)) ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li className={styles.headerItem} onClick={() => this.tabHandler(addActivity)}>
            <img
              src={addActivityCondition ? addActivityIconActive : addActivityIcon}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.state.showFakeInput ? (
          <div className={styles.fakeInput} onClick={() => this.tabHandler(this.state.activeTab)}>Click here to take notes...</div>
        ) : (
            <div>{this.state.activeTab}</div>
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

export default connect(mapStateToProps, { createNote, createActivity })(EditLeadTabs)

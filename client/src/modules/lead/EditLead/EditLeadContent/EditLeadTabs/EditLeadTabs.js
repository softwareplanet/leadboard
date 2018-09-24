import React, { Component } from "react";
import styles from "./EditLeadTabs.css";

import takeNotesIcon from "../../../../../assets/take-notes/take-notes.svg"
import takeNotesIconActive from "../../../../../assets/take-notes/take-notes-active.svg"
import addActivityIcon from "../../../../../assets/add-activity/add-activity.svg"
import addActivityIconActive from "../../../../../assets/add-activity/add-activity-active.svg"
import { connect } from 'react-redux'
import { createNote } from "../EditLeadHistory/Notes/noteActions";
import { createActivity } from "../../Activities/activityActions"
import EditLeadEditor from "./EditLeadEditor/EditLeadEditor";
import AddActivity from "./AddActivity/AddActivity";
import isBlank from "../../../../../utils/isBlank";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);
class EditLeadTabs extends Component {
  state = {
    activeTab: null,
    showFakeInput: true,
    fakeInputContent: " take notes",
  };

  componentDidMount() {
    if (this.state.activeTab === null) {
      this.setState({ activeTab: <EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.onNoteSave} /> });
    }
  }

  tabHandler = content => {
    this.setState({
      activeTab: content, showFakeInput: false,
    });
    this.fakeHandler(content)
  };

  fakeHandler = (activeTab) => {

    switch (activeTab.type) {
      case (this.getNoteEditor().type): {
        this.setState({ fakeInputContent: " take notes" })
        break;
      }
      case (this.getAddActivity().type): {
        this.setState({ fakeInputContent: " add activity" })
        break;
      }
      default: {
        this.setState({ fakeInputContent: " take notes" })
        break;
      }

    }
  }

  onNoteSave = noteText => {
    const { editLead } = this.props;
    let note = {
      attachedTo: editLead._id,
      text: noteText,
      lead: editLead._id,
      contact: editLead.contact._id,
      organization: editLead.organization._id,
    };

    this.props.createNote(note);
    this.setState({ showFakeInput: true })
  };

  onActivitySave = activity => {
    this.props.createActivity({
      ...activity,
      lead: this.props.editLead._id,
      assignedTo: this.props.userId,
    })
    this.setState({ showFakeInput: true })
  }

  onCancel = () => {
    this.setState({ showFakeInput: true })
  }

  isActive = (component) => {
    return (this.state.activeTab ? this.state.activeTab.type : null) === component;
  }

  renderFakeInput = (condition, notesCondition) => {
    if (condition) {
      return (<div className={styles.fakeInput} onClick={() =>
        this.tabHandler(notesCondition ? this.getNoteEditor() : this.state.activeTab)}>
        Click here to{this.state.fakeInputContent}...</div>);
    }
    else {
      return (<div>{this.state.activeTab}</div>)
    }
  }

  getNoteEditor = () => {
    return (<EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.onNoteSave} />);
  }

  getAddActivity = () => {
    return (<AddActivity onCancel={this.onCancel} onSave={this.onActivitySave} />);
  }
  render() {
    let takeNotesCondition = this.isActive(EditLeadEditor) || isBlank(this.state.activeTab);
    let addActivityCondition = this.isActive(AddActivity);

    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li
            className={cx(styles.headerItem, { active: takeNotesCondition })}
            onClick={() => this.tabHandler(this.getNoteEditor())}>
            <img
              src={takeNotesCondition ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li
            className={cx(styles.headerItem, { active: addActivityCondition })}
            onClick={() => this.tabHandler(this.getAddActivity())}>
            <img
              src={addActivityCondition ? addActivityIconActive : addActivityIcon}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.renderFakeInput(this.state.showFakeInput, takeNotesCondition)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.dashboard.editLead.lead,
  userId: state.auth.userid
});

export { EditLeadTabs }

export default connect(mapStateToProps, { createNote, createActivity })(EditLeadTabs)

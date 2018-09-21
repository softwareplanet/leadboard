import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import { formatDate } from "../../../../../../../utils/formatDate";
import spreadButton from "../../../../../../../assets/spread-button.svg"
import { Popover, PopoverBody } from "reactstrap";
import EditLeadEditor from "../../../EditLeadTabs/EditLeadEditor/EditLeadEditor";

class Note extends Component {
  state = {
    showPopover: false,
    showEditor: false
  }

  togglePopover = () => {
    this.setState({
      showPopover: !this.state.showPopover
    });
  }

  onSave = (text) => {
    let note = { _id: this.props.note._id, text }
    this.props.updateNote(note)
  }

  onNoteDelete = () => {
    this.togglePopover();
    if (window.confirm("Are you sure?")){
      this.props.deleteNote(this.props.note)
    }
  }

  toggleEditor = () => {
    this.setState({
      showEditor: !this.state.showEditor,
      showPopover: false
    });
  }

  render() {
    let { date, user, text, lastUpdater} = this.props.note;
    let lastUpdaterSpan = (
      <span>
        {
          lastUpdater ? 
            (
              <span>
                <span name="separator">&nbsp; &#183; &nbsp;</span>
                  Last edited: { lastUpdater.firstname + " " + lastUpdater.lastname }
              </span>
            )
            : ""
        }
      </span>
    )
    let noteContent = (
      <div className={styles.noteContent}>
        <div className={styles.header}>
          <div className={styles.dateWrapper}>
            <span>{formatDate(date)}</span>
            <span name="separator">&nbsp; &#183; &nbsp;</span>{user.firstname + " " + user.lastname}
            {lastUpdaterSpan}
          </div>
          <div>
            <img 
              id={`id${this.props.note._id}`} 
              onClick={this.togglePopover} 
              className={styles.spreadButton} 
              src={spreadButton} 
              alt="options" 
            />
            <Popover 
              placement="bottom-end"
              isOpen={this.state.showPopover} 
              target={`id${this.props.note._id}`} 
              toggle={this.togglePopover}
            >
              <PopoverBody className={styles.popover}>
                <ul className={styles.list}>
                  <li className={styles.listElement} onClick={this.toggleEditor}>Edit</li>
                  <li className={styles.listElement} onClick={this.onNoteDelete}>Delete</li>
                </ul>
              </PopoverBody>
            </Popover>
          </div>
        </div>
        <div className={styles.textWrapper}>
          <span>{text}</span>
        </div>
      </div>
    );

    let editor =  (
      <EditLeadEditor 
        height={100} 
        text={this.props.note.text} 
        onSave={this.onSave} 
        onCancel={this.toggleEditor} 
      />
    )

    return this.state.showEditor ? editor : noteContent
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;

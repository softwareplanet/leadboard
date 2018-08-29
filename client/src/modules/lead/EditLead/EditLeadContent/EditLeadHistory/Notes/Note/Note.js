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

  toggle = () => {
    this.setState({
      showPopover: !this.state.showPopover
    });
  }

  onSave = (text) => {
    let note = { _id: this.props.note._id, text, lastUpdater: this.props.lastUpdater }
    this.props.updateNote(this.props.leadId, note)
  }

  showEditor = () => {
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
              onClick={this.toggle} 
              className={styles.spreadButton} 
              src={spreadButton} 
              alt="options" 
            />
            <Popover 
              placement="bottom-end"
              isOpen={this.state.showPopover} 
              target={`id${this.props.note._id}`} 
              toggle={this.toggle}
            >
              <PopoverBody className={styles.popover}>
                <ul className={styles.ul}>
                  <li className={styles.li} onClick={this.showEditor}>Edit</li>
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

    let editor = <EditLeadEditor height={100} text={this.props.note.text} onSave={this.onSave} onCancel={this.showEditor} />

    return this.state.showEditor ? editor : noteContent
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;

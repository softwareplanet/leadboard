import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import { formatDate } from "../../../../../utils/formatDate";
import spreadButton from "../../../../../assets/spread-button.svg"
import { Popover, PopoverBody } from "reactstrap";
import EditLeadEditor from "../../EditLeadContent/EditLeadTabs/EditLeadEditor/EditLeadEditor";

class Note extends Component {
  state = {
    popoverOpen: false,
    showEditor: false
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onSave = () => {

  }

  onCancel = () => {

  }

  showEditor = () => {
    this.setState({
      showEditor: !this.state.showEditor
    });
  }

  render() {
    let { date, user, text } = this.props.note;

    let noteContent = (
      <div className={styles.noteContent}>
        <div className={styles.header}>
          <div className={styles.mainInfo}>
            <span>{formatDate(date)}</span>
            <span name="separator">&nbsp; &#183; &nbsp;</span>{user.firstname + " " + user.lastname}
          </div>
          <div>
            <img 
              id="note-spread-button" 
              onClick={this.toggle} 
              className={styles.spreadButton} 
              src={spreadButton} 
              alt="options" 
            />
            <Popover 
              placement="bottom-end"
              isOpen={this.state.popoverOpen} 
              target="note-spread-button" 
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

    let editor = <EditLeadEditor onSave={this.onSave} onCancel={this.onCancel} />

    return this.state.showEditor ? editor : noteContent
      
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;

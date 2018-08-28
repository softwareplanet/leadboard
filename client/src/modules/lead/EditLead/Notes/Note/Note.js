import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Note.css";
import { formatDate } from "../../../../../utils/formatDate";
import spreadButton from "../../../../../assets/spread-button.svg"
import { Popover, PopoverBody } from "reactstrap";

class Note extends Component {
  state = {
    popoverOpen: false
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    let { date, user, text } = this.props.note;
    return (
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
                   <li className={styles.li}>Edit</li>
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
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};

export default Note;

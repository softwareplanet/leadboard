import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Notes.css";
import PropTypes from "prop-types";
import Note from "./Note/Note";
import InfoItemWrapper from "../../../../../common/InfoWraper/InfoItemWrapper";
import { updateNote, deleteNote } from "./noteActions";
import { isEmpty } from "lodash";

class Notes extends Component {

  noteUpdateHandler = (note) => {
    this.props.updateNote(note)
  };

  noteDeleteHandler = (note) => {
    this.props.deleteNote(note)
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.timeLineBar} />
        {!isEmpty(this.props.notes) ? this.props.notes.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        }).map((note) => {
          return (
            <InfoItemWrapper
              key={note._id}
              component={
              <Note 
                updateNote={this.noteUpdateHandler} 
                deleteNote={this.noteDeleteHandler}
                note={note}
              />}
            />
          );
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userid,
  editLead: state.dashboard.editLead.lead,
  notes:state.dashboard.editLead.notes,
});

Notes.propTypes = {
  editLead: PropTypes.object,
};

export default connect(mapStateToProps, { updateNote, deleteNote })(Notes);

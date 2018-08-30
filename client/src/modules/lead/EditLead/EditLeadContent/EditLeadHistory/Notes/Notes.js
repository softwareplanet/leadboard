import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Notes.css";
import PropTypes from "prop-types";
import Note from "./Note/Note";
import InfoItemWrapper from "../../../../../common/InfoWraper/InfoItemWrapper";
import { updateNote, deleteNote } from "../../../../leadActions";

class Notes extends Component {

  noteUpdateHandler = (note) => {
    this.props.updateNote(this.props.editLead._id, note)
  }

  noteDeleteHandler = (noteId) => {
    this.props.deleteNote(this.props.editLead._id, noteId)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.timeLineBar}/>
        {this.props.editLead ? this.props.editLead.notes.sort(function(a, b) {
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
  editLead: state.leads.editLead,
});

Notes.propTypes = {
  editLead: PropTypes.object
};

export default connect(mapStateToProps, { updateNote, deleteNote })(Notes);

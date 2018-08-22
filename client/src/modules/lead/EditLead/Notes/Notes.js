import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Notes.css";
import Note from "./Note/Note";

class Notes extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.timeLineBar}/>
        {this.props.editLead ? this.props.editLead.notes.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
        }).map((note) => {
          return (
            <Note
              user={note.user.firstname}
              text={note.text}
              date={note.date}
            />
          );
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
});

export default connect(mapStateToProps)(Notes);
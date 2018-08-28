import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Notes.css";
import PropTypes from "prop-types";
import Note from "./Note/Note";
import InfoItemWrapper from "../../../common/InfoWraper/InfoItemWrapper";
import { updateNote } from "../../leadActions";

class Notes extends Component {
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
                lastUpdater={this.props.userId} 
                leadId={this.props.editLead._id} 
                updateNote={this.props.updateNote} 
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

Notes.PropTypes = {
  editLead: PropTypes.object
};

export default connect(mapStateToProps, { updateNote })(Notes);

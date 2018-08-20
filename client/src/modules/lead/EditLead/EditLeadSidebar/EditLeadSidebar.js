import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import PropTypes from "prop-types";
import { loadLead } from "../../leadActions";
import { connect } from "react-redux";
import _ from "lodash";

class EditLeadSidebar extends Component {
  render() {
    return this.props.editLead ? <div className={styles.sidebar}>{Cards(EditCard)(this.props.editLead.contact)}</div> :
        <div />;
  }
}

const Cards = Component => props => {
  if ("organization" in props && _.isEmpty(props.name)) {
    return (
      <div>
        <Component value={props.organization} title={"Organization"} />
      </div>
    );
  } else if ("organization" in props) {
    return (
      <div>
        <Component value={props.organization} title={"Organization"} />
        <Component value={props} title={"Person"} />
      </div>
    );
  } else {
    return (
      <div>
        <Component value={props} title={"Person"} />
      </div>
    );
  }
};

EditLeadSidebar.propTypes = {
  loadLead: PropTypes.func.isRequired,
  editLead: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  editLead: state.leads.editLead
});

export default connect(
  mapStateToProps,
  { loadLead }
)(EditLeadSidebar);

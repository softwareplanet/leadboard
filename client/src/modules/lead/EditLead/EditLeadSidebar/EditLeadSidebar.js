import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import personIcon from "../../../../img/personIcon.svg";
import organizationIcon from "../../../../img/organizationIcon.svg";
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
        <Component model={props.organization} title={"Organization"} icon={organizationIcon} />
      </div>
    );
  } else if ("organization" in props) {
    return (
      <div>
        <Component model={props.organization} title={"Organization"} icon={organizationIcon} />
        <Component model={props} title={"Person"} icon={personIcon} />
      </div>
    );
  } else {
    return (
      <div>
        <Component model={props} title={"Person"} icon={personIcon} />
      </div>
    );
  }
};

EditLeadSidebar.propTypes = {
  loadLead: PropTypes.func.isRequired,
  editLead: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  { loadLead },
)(EditLeadSidebar);

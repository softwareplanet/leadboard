import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import personIcon from "../../../../img/personIcon.svg";
import organizationIcon from "../../../../img/organizationIcon.svg";
import PropTypes from "prop-types";
import { loadLead, updateContact, updateOrganization } from "../../leadActions";
import { connect } from "react-redux";

class EditLeadSidebar extends Component {
  render() {
    if (this.props.editLead) {
      const { contact, organization } = this.props.editLead;
      const contactCard =
        <EditCard
          model={contact}
          title={"Person"}
          icon={personIcon}
          onUpdate={this.props.updateContact} />;
      const organizationCard =
        <EditCard
          model={organization}
          title={"Organization"}
          icon={organizationIcon}
          onUpdate={this.props.updateOrganization} />;
      let cards =
        <div>
          {organization ? organizationCard : ""}
          {contact ? contactCard : ""}
        </div>;
      return <div className={styles.sidebar}>{cards}</div>;
    } else {
      return <div className={styles.sidebar}/>;
    }
  }
}

EditLeadSidebar.propTypes = {
  loadLead: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func,
  updateContact: PropTypes.func,
  editLead: PropTypes.object,
};

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  { loadLead, updateOrganization, updateContact },
)(EditLeadSidebar);

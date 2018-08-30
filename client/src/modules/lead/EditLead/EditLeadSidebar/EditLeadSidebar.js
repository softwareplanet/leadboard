import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import personIcon from "../../../../img/personIcon.svg";
import organizationIcon from "../../../../img/organizationIcon.svg";
import PropTypes from "prop-types";
import { loadLead, updateContact, updateLead, updateOrganization } from "../../leadActions";
import { loadOrganizations } from "../../../common/autocomplete/organization/organizationActions";
import { loadContacts } from "../../../common/autocomplete/contact/contactActions";
import { connect } from "react-redux";

import editCardStyles from "./EditCard/EditCard.css";
import EmptyCard from "./EditCard/EmptyCard/EmptyCard";
import classNames from "classnames";
import ContactAutocomplete from "../../../common/autocomplete/contact/ContactAutocomplete";
import OrganizationAutocomplete from "../../../common/autocomplete/organization/OrganizationAutocomplete";
import { autocompleteStyles } from "../../../common/autocomplete/styles/autocomplete-styles";

class EditLeadSidebar extends Component {
  componentDidMount() {
    this.props.loadContacts();
    this.props.loadOrganizations();
  }

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
      const emptyOrganizationCard = (
        <EmptyCard
          id="organization-card"
          title="Organization"
          styles={autocompleteStyles.linkOrganization}
          iTagClass={classNames("fas fa-building", editCardStyles.inputIcon)}
          items={this.props.organizations}
          lead={this.props.editLead}
          onUpdate={this.props.updateLead}
        >
          <OrganizationAutocomplete />
        </EmptyCard>
      );
      const emptyContactCard = (
        <EmptyCard
          id="contact-card"
          title="Person"
          styles={autocompleteStyles.linkPerson}
          iTagClass={classNames("fas fa-user", editCardStyles.inputIcon)}
          items={this.props.contacts}
          lead={this.props.editLead}
          onUpdate={this.props.updateLead}
        >
          <ContactAutocomplete />
        </EmptyCard>
      );

      let cards =
        <div>
          {organization ? organizationCard : emptyOrganizationCard}
          {contact ? contactCard : emptyContactCard}
        </div>;
      return <div className={styles.sidebar}>{cards}</div>;
    } else {
      return <div className={styles.sidebar} />;
    }
  }
}

EditLeadSidebar.propTypes = {
  loadLead: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func,
  updateContact: PropTypes.func,
  editLead: PropTypes.object,
  loadOrganizations: PropTypes.func,
  loadContacts: PropTypes.func,
  updateLead: PropTypes.func,
};

const mapStateToProps = state => ({
  editLead: state.leads.editLead,
  contacts: state.contacts,
  organizations: state.organizations,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  { loadLead, updateOrganization, updateContact, loadOrganizations, loadContacts, updateLead },
)(EditLeadSidebar);

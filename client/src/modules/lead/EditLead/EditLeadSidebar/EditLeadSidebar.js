import React, { Component } from "react";
import styles from "./EditLeadSidebar.css";
import EditCard from "./EditCard/EditCard";
import personIcon from "../../../../img/personIcon.svg";
import organizationIcon from "../../../../img/organizationIcon.svg";
import PropTypes from "prop-types";
import { loadLead, updateContact, updateOrganization } from "../../leadActions";
import { connect } from "react-redux";
import _ from "lodash";

import editCardStyles from "./EditCard/EditCard.css";
import EmptyCard from "./EmptyCard/EmptyCard";
import classNames from "classnames";
import ContactAutocomplete from "../../AddLead/autocomplete/contact/ContactAutocomplete";
import OrganizationAutocomplete from "../../AddLead/autocomplete/organization/OrganizationAutocomplete";

class EditLeadSidebar extends Component {
  render() {
    if (this.props.editLead) {
      const { contact } = this.props.editLead;
      const contactCard =
        <EditCard
          model={contact}
          title={"Person"}
          icon={personIcon}
          onUpdate={this.props.updateContact} />;
      let cards;
      if ("organization" in contact) {
        const { organization } = contact;
        const organizationCard =
          <EditCard
            model={organization}
            title={"Organization"}
            icon={organizationIcon}
            onUpdate={this.props.updateOrganization} />;
        cards = <div>{organizationCard}{contactCard}</div>;
        if (_.isEmpty(contact.name)) {
          cards = <div>{organizationCard}</div>;
        }
      }
      else {
        cards = <div>{contactCard}</div>;
      }
      return (
        <div className={styles.sidebar}>
          <EmptyCard
            title="Organization"
            iTagClass={classNames("fas fa-building", editCardStyles.inputIcon)}
          >
            <OrganizationAutocomplete />
          </EmptyCard>

          <EmptyCard
            title="Person"
            iTagClass={classNames("fas fa-user", editCardStyles.inputIcon)}
          >
            <ContactAutocomplete />
          </EmptyCard>
        </div>
      );
    } else {
      return <div />;
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

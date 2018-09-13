import * as React from 'react';
import { connect } from 'react-redux';
import organizationIcon from '../../../../img/organizationIcon.svg';
import personIcon from '../../../../img/personIcon.svg';
import { loadContacts } from '../../../common/autocomplete/contact/contactActions';
import { loadOrganizations } from '../../../common/autocomplete/organization/organizationActions';
import { loadLead, updateContact, updateLead, updateOrganization } from '../../leadActions';
import { deleteCustomField } from '../../../settings/domain/domainActions';
import EditCard from './EditCard/EditCard';
import * as styles from './EditLeadSidebar.css';

import classNames from 'classnames';
import Contact from '../../../../models/Contact';
import Domain from '../../../../models/Domain';
import Lead from '../../../../models/Lead';
import Organization from '../../../../models/Organization';
import ContactAutocomplete from '../../../common/autocomplete/contact/ContactAutocomplete';
import OrganizationAutocomplete from '../../../common/autocomplete/organization/OrganizationAutocomplete';
import { autocompleteStyles } from '../../../common/autocomplete/styles/autocomplete-styles';
import { getCustomFieldSettingsByModel, makeCustomFieldData } from './CustomFieldsService';
import * as editCardStyles from './EditCard/EditCard.css';
import EmptyCard from './EmptyCard/EmptyCard';

interface Props {
  domain: Domain;
  editLead: Lead;
  contacts: Contact[];
  organizations: Organization[];

  loadLead(): void;

  updateOrganization(organization: Organization): void;

  updateContact(contact: Contact): void;

  loadOrganizations(): void;

  loadContacts(): void;

  updateLead(lead: Lead): void;

  deleteCustomField(customFieldId: string, domainId: string): void;
}

class EditLeadSidebar extends React.Component<Props> {
  public componentDidMount() {
    this.props.loadContacts();
    this.props.loadOrganizations();
  }

  public render() {
    const { settings } = this.props.domain;

    if (this.props.editLead) {
      const { contact, organization } = this.props.editLead;
      let contactCard;
      if (contact) {
        contactCard =
          <EditCard
            deleteCustomField={this.deleteCustomField}
            model={contact}
            title={'Person'}
            icon={personIcon}
            onUpdate={this.props.updateContact}
            customFieldsSettings={getCustomFieldSettingsByModel('Contact', settings)}
            customFields={makeCustomFieldData('Contact', contact, settings)}
          />;
      }
      let organizationCard;
      if (organization) {
        organizationCard =
          <EditCard
            deleteCustomField={this.deleteCustomField}
            model={organization}
            title={'Organization'}
            icon={organizationIcon}
            onUpdate={this.props.updateOrganization}
            customFieldsSettings={getCustomFieldSettingsByModel('Organization', settings)}
            customFields={makeCustomFieldData('Organization', organization, settings)}
          />;
      }
      const emptyOrganizationCard = (
        <EmptyCard
          id="organization-card"
          title="Organization"
          styles={autocompleteStyles.linkOrganization}
          iTagClass={classNames('fas fa-building', editCardStyles.inputIcon)}
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
          iTagClass={classNames('fas fa-user', editCardStyles.inputIcon)}
          items={this.props.contacts}
          lead={this.props.editLead}
          onUpdate={this.props.updateLead}
        >
          <ContactAutocomplete />
        </EmptyCard>
      );

      const cards =
        <div>
          {organization ? organizationCard : emptyOrganizationCard}
          {contact ? contactCard : emptyContactCard}
        </div>;
      return <div className={styles.sidebar}>{cards}</div>;
    } else {
      return <div className={styles.sidebar} />;
    }
  }

  private deleteCustomField = (customFieldId: string) => {
    this.props.deleteCustomField(customFieldId, this.props.domain._id);
  };
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
  domain: state.domain,
  editLead: state.leads.editLead.lead,
  organizations: state.organizations,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  {
    deleteCustomField,
    loadContacts,
    loadLead,
    loadOrganizations,
    updateContact,
    updateLead,
    updateOrganization,
  },
)(EditLeadSidebar);

import * as React from 'react';
import { connect } from 'react-redux';
import organizationIcon from '../../../../img/organizationIcon.svg';
import personIcon from '../../../../img/personIcon.svg';
import { loadContacts } from '../../../common/autocomplete/contact/contactActions';
import { loadOrganizations } from '../../../common/autocomplete/organization/organizationActions';
import { loadLead, updateContact, updateLead, updateOrganization } from '../../leadActions';
import EditCard from './EditCard/EditCard';
import * as styles from './EditLeadSidebar.css';

import classNames from 'classnames';
import Contact from '../../../../models/Contact';
import DomainSettings from '../../../../models/DomainSettings';
import Lead from '../../../../models/Lead';
import Organization from '../../../../models/Organization';
import ContactAutocomplete from '../../../common/autocomplete/contact/ContactAutocomplete';
import OrganizationAutocomplete from '../../../common/autocomplete/organization/OrganizationAutocomplete';
import { autocompleteStyles } from '../../../common/autocomplete/styles/autocomplete-styles';
import { getCustomFieldSettingsByModel, makeCustomFieldData } from './CustomFieldsService';
import * as editCardStyles from './EditCard/EditCard.css';
import EmptyCard from './EmptyCard/EmptyCard';

interface Props {
  settings: DomainSettings;
  editLead: Lead;
  contacts: Contact[];
  organizations: Organization[];

  loadLead(): void;

  updateOrganization(organization: Organization): void;

  updateContact(contact: Contact): void;

  loadOrganizations(): void;

  loadContacts(): void;

  updateLead(lead: Lead): void;
}

class EditLeadSidebar extends React.Component<Props> {
  public componentDidMount() {
    this.props.loadContacts();
    this.props.loadOrganizations();
  }

  public render() {
    const { settings } = this.props;

    if (this.props.editLead) {
      const { contact, organization } = this.props.editLead;
      let contactCard;
      if (contact) {
        contactCard =
          <EditCard
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
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
  editLead: state.leads.editLead.lead,
  organizations: state.organizations,
  settings: state.domain.settings,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  { loadLead, updateOrganization, updateContact, loadOrganizations, loadContacts, updateLead },
)(EditLeadSidebar);

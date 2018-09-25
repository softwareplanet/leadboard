import * as React from 'react';
import { connect } from 'react-redux';
import organizationIcon from '../../../../assets/img/organizationIcon.svg';
import personIcon from '../../../../assets/img/personIcon.svg';
import { loadContacts } from '../../../layouts/Contacts/People/contactActions';
import { loadOrganizations } from '../../../layouts/Contacts/Organizations/organizationActions';
import { addCustomFieldToDomain, editCustomFieldInDomain } from '../../../settings/customFieldsActions';
import { deleteCustomField } from '../../../settings/domain/domainActions';
import { loadLead, updateContact, updateLead, updateOrganization } from '../../leadActions';
import EditCard from './EditCard/EditCard';
import * as styles from './EditLeadSidebar.css';

import classNames from 'classnames';
import Contact from '../../../../models/Contact';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
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

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  loadContacts(): void;

  updateLead(lead: Lead): void;

  deleteCustomField(id: string): void;
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
            deleteCustomField={this.deleteCustomField}
            model={contact}
            title="Person"
            modelType="Contact"
            addCustomFieldToDomain={this.props.addCustomFieldToDomain}
            editCustomFieldInDomain={this.props.editCustomFieldInDomain}
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
            modelType="Organization"
            title="Organization"
            icon={organizationIcon}
            onUpdate={this.props.updateOrganization}
            addCustomFieldToDomain={this.props.addCustomFieldToDomain}
            editCustomFieldInDomain={this.props.editCustomFieldInDomain}
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
    if (window.confirm('You will delete the field from everywhere' +
      ' in your Pipedrive as well as delete data stored' +
      ' within this field. Are you sure you want to delete?')
    ) {
      this.props.deleteCustomField(customFieldId);
    }
  };
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts.contacts,
  editLead: state.dashboard.editLead.lead,
  organizations: state.organizations,
  settings: state.domain.settings,
});

export { EditLeadSidebar };

export default connect(
  mapStateToProps,
  {
    addCustomFieldToDomain,
    deleteCustomField,
    editCustomFieldInDomain,
    loadContacts,
    loadLead,
    loadOrganizations,
    updateContact,
    updateLead,
    updateOrganization,
  },
)(EditLeadSidebar);

import classNames from 'classnames';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import organizationIcon from '../../../../assets/img/organizationIcon.svg';
import Contact from '../../../../models/Contact';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';
import OrganizationAutocomplete from '../../../common/autocomplete/organization/OrganizationAutocomplete';
import { autocompleteStyles } from '../../../common/autocomplete/styles/autocomplete-styles';
import { loadOrganizations } from '../../../layouts/Contacts/Organizations/organizationActions';
import { getCustomFieldSettingsByModel,makeCustomFieldData } from '../../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
import EditCard from '../../../lead/EditLead/EditLeadSidebar/EditCard/EditCard';
import * as editCardStyles from '../../../lead/EditLead/EditLeadSidebar/EditCard/EditCard.css';
import EmptyCard from '../../../lead/EditLead/EditLeadSidebar/EmptyCard/EmptyCard';
import { addCustomFieldToDomain, editCustomFieldInDomain } from '../../../settings/customFieldsActions';
import { deleteCustomField } from '../../../settings/domain/domainActions';
import * as detailedViewStyles from '../../detailedView.css';
import { updateOrganization } from '../../Organization/detailedOrganizationActions';
import { updateContact } from '../detailedContactActions';


interface Props {
  settings: DomainSettings;
  organizations?: Organization[];
  contact: Contact;

  loadOrganizations(): void;

  updateOrganization(organization: Organization): void;

  updateContact(contact: Contact): void;

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  deleteCustomField(id: string): void;
}

class ContactSidebar extends React.Component<Props> {
  public componentDidMount() {
    this.props.loadOrganizations();
  }

  public render() {
    const { settings, contact, organizations } = this.props;
    const { organization } = this.props.contact;
    let organizationCard;
    let contactCard;
    if(contact){
      contactCard = (
        <EditCard
          advancedMode={false}
          deleteCustomField={this.deleteCustomField}
          model={contact}
          title="Details"
          modelType="Contact"
          addCustomFieldToDomain={this.props.addCustomFieldToDomain}
          editCustomFieldInDomain={this.props.editCustomFieldInDomain}
          onUpdate={this.props.updateContact}
          customFieldsSettings={getCustomFieldSettingsByModel('Contact', settings)}
          customFields={makeCustomFieldData('Contact', contact, settings)}
        />
      );
    }

    if(organization) {
      organizationCard = (
        <EditCard
          advancedMode={true}
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
        />
      );
    }

    const emptyOrganizationCard = (
      <EmptyCard
        id="organization-card"
        title="Organization"
        styles={autocompleteStyles.linkOrganization}
        iTagClass={classNames('fas fa-building', editCardStyles.inputIcon)}
        items={organizations}
        model={contact}
        onUpdate={this.props.updateContact}
      >
        <OrganizationAutocomplete />
      </EmptyCard>
    );

    return (
      <div className={detailedViewStyles.sidebar}>
        { contactCard }
        { isEmpty(contact.organization) ? emptyOrganizationCard : organizationCard }
      </div>
    );
  }

  private deleteCustomField = (customFieldId: string) => {
    if (window.confirm('You will delete the field from everywhere' +
      ' in your Pipedrive as well as delete data stored' +
      ' within this field. Are you sure you want to delete?')
    ) {
      this.props.deleteCustomField(customFieldId);
    }
  }
}

const mapStateToProps = (state: any) => ({
  contact: state.contact.detailedContact.contact,
  organizations: state.organization.organizations,
  settings: state.domain.settings,
});

export { ContactSidebar };

export default connect(
  mapStateToProps,
  {
    addCustomFieldToDomain,
    deleteCustomField,
    editCustomFieldInDomain,
    loadOrganizations,
    updateContact,
    updateOrganization,
  },
)(ContactSidebar);

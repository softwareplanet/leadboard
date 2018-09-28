import * as React from 'react';
import { connect } from 'react-redux';
import Contact from '../../../../models/Contact';
import * as detailedViewStyles from '../../detailedView.css';

import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';
import { getCustomFieldSettingsByModel, makeCustomFieldData } from '../../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
import EditCard from '../../../lead/EditLead/EditLeadSidebar/EditCard/EditCard';
import { addCustomFieldToDomain, editCustomFieldInDomain } from '../../../settings/customFieldsActions';
import { deleteCustomField } from '../../../settings/domain/domainActions';
import { updateOrganization } from '../detailedOrganizationActions';
import OrganizationContactsCard from './OrganizationContactsCard/OrganizationContactsCard';

interface Props {
  settings: DomainSettings;
  contacts: Contact[];
  organization: Organization;

  updateOrganization(organization: Organization): void;

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  deleteCustomField(id: string): void;
}

class OrganizationSidebar extends React.Component<Props> {

  public render() {
    const { organization, settings } = this.props;
    let organizationCard;
    if (organization) {
      organizationCard = (
        <EditCard
          showMainField={false}
          deleteCustomField={this.deleteCustomField}
          model={organization}
          modelType="Organization"
          title="Details"
          onUpdate={this.props.updateOrganization}
          addCustomFieldToDomain={this.props.addCustomFieldToDomain}
          editCustomFieldInDomain={this.props.editCustomFieldInDomain}
          customFieldsSettings={getCustomFieldSettingsByModel('Organization', settings)}
          customFields={makeCustomFieldData('Organization', organization, settings)}
        />
      );
    }

      return (
        <div className={detailedViewStyles.sidebar}>
          { organizationCard }
          <OrganizationContactsCard contacts={this.props.contacts}/>
        </div>
      );
  }

  private deleteCustomField = (customFieldId: string) => {
    if (window.confirm('You will delete the field from everywhere' +
      ' in your Leadboard as well as delete data stored' +
      ' within this field. Are you sure you want to delete?')
    ) {
      this.props.deleteCustomField(customFieldId);
    }
  }
}

const mapStateToProps = (state: any) => ({
    contacts: state.organization.detailedOrganization.contacts,
    organization: state.organization.detailedOrganization.organization,
    settings: state.domain.settings,
});

export { OrganizationSidebar };

export default connect(
  mapStateToProps,
  {
    addCustomFieldToDomain,
    deleteCustomField,
    editCustomFieldInDomain,
    updateOrganization,
  },
)(OrganizationSidebar);

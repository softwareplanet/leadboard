import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import Contact from '../../../../models/Contact';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';
import OrganizationAutocomplete from '../../../common/autocomplete/organization/OrganizationAutocomplete';
import { autocompleteStyles } from '../../../common/autocomplete/styles/autocomplete-styles';
import {
  getCustomFieldSettingsByModel,
  makeCustomFieldData,
} from '../../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
import EditCard from '../../../lead/EditLead/EditLeadSidebar/EditCard/EditCard';
import * as editCardStyles from '../../../lead/EditLead/EditLeadSidebar/EditCard/EditCard.css';
import EmptyCard from '../../../lead/EditLead/EditLeadSidebar/EmptyCard/EmptyCard';
import { updateContact } from '../../../lead/leadActions';
import { addCustomFieldToDomain, editCustomFieldInDomain } from '../../../settings/customFieldsActions';
import { deleteCustomField } from '../../../settings/domain/domainActions';
import * as detailedViewStyles from '../../detailedView.css';


interface Props {
  settings: DomainSettings;
  organizations?: Organization[];

  updateContact(contact: Contact): void;

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  deleteCustomField(id: string): void;
}

class ContactSidebar extends React.Component<Props> {

  public render() {
    const { settings } = this.props;

    const contact = {
      __v: 0,
      _id: '5ba893074d1ee31a7e7c2b7e',
      custom: [],
      domain: '5ba892ff4d1ee31a7e7c2b73',
      name: 'Bob',
      owner: '5ba892ff4d1ee31a7e7c2b74',
      timestamp: new Date(),
    };

    const contactCard =
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
      />;

    const emptyOrganizationCard = (
      <EmptyCard
        id="organization-card"
        title="Organization"
        styles={autocompleteStyles.linkOrganization}
        iTagClass={classNames('fas fa-building', editCardStyles.inputIcon)}
        items={this.props.organizations}
      >
        <OrganizationAutocomplete />
      </EmptyCard>
    );

    return (
      <div className={detailedViewStyles.sidebar}>
        { contactCard }
        { emptyOrganizationCard }
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
  settings: state.domain.settings,
});

export { ContactSidebar };

export default connect(
  mapStateToProps,
  {
    addCustomFieldToDomain,
    deleteCustomField,
    editCustomFieldInDomain,
    updateContact,
  },
)(ContactSidebar);

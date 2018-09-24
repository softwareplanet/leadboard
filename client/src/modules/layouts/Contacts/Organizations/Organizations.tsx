import * as React from 'react';
import { connect } from 'react-redux';
import ContactsPage from '../ContactsPageTemplate';
import AddOrganization from './AddOrganization/AddOrganization';
import { loadAggregatedOrganizations } from './organizationActions';

export class OrganizationPage extends ContactsPage {
  public modelName = 'Organization';
  public noContactsMessage = 'No organizations added yet';
  public oneContactHeader = 'organization';
  public moreThanOneContactsHeader = 'organizations';
  public signCreateNew = 'Create new organization';

  public columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'contacts',
      text: 'People',
    },
  ];
  public createAddButton = () =>
    <AddOrganization
      isModalOpen={this.state.isModalOpen}
      openModal={this.openAddingModal}
      closeModal={this.closeAddingModal}
    />
}


const mapStateToProps = (state: any) => ({
  contacts: state.organizations,
  domainCustomFields: state.domain.settings.customFields,
});

export default connect(
  mapStateToProps,
  { loadAggregatedContacts: loadAggregatedOrganizations },
)(OrganizationPage);

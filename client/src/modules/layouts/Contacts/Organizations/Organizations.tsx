import { connect } from 'react-redux';
import ContactsPage from '../ContactsPageTemplate';
import { loadAggregatedOrganizations } from './organizationActions';

export class OrganizationPage extends ContactsPage {
  public modelName = 'Organization';
  public noContactsMessage = 'No organizations added yet';
  public oneContactHeader = 'organization';
  public moreThanOneContactsHeader = 'organizations';
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
}

const mapStateToProps = (state: any) => ({
  contacts: state.organizations,
  domainCustomFields: state.domain.settings.customFields,
});

export default connect(mapStateToProps, { loadAggregatedContacts: loadAggregatedOrganizations })(OrganizationPage);

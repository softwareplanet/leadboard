import { connect } from 'react-redux';
import ContactsPage from '../ContactsPageTemplate';
import { loadAggregatedContacts } from './contactActions';

export class People extends ContactsPage {
  public modelName = 'Contact';
  public noContactsMessage = 'No people added yet';
  public oneContactHeader = 'person';
  public moreThanOneContactsHeader = 'people';
  public columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'organization.name',
      text: 'Organization',
    },
  ];
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts.contacts,
  domainCustomFields: state.domain.settings.customFields,
});

export default connect(mapStateToProps, { loadAggregatedContacts })(People);

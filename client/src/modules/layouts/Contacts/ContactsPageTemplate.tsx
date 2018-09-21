import * as React from 'react';
import ContactData from '../../../models/ContactData';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import Table from '../../common/Table/Table';
import NavBar from '../Navbar/Navbar';
import * as styles from './ContactsPageTemplate.css';
import { getTableData } from './ContactsService';
import { isContactsDataValid } from './ContactsUtils';

interface Props {
  contacts: ContactData[];
  domainCustomFields: CustomFieldSetting[];

  loadAggregatedContacts(): void;
}

class ContactsPage extends React.Component<Props, object> {
  public domainCustomFields: CustomFieldSetting[];
  public modelName: string;
  public noContactsMessage: string;
  public oneContactHeader: string;
  public moreThanOneContactsHeader: string;
  public columns: any[];

  public componentWillMount = () => {
    this.props.loadAggregatedContacts();
  };

  public render() {
    const { contacts } = this.props;
    const contactsCount = contacts.length;
    if (isContactsDataValid(contacts)) {
      const tableData = getTableData(this.modelName, contacts, this.props.domainCustomFields, this.columns);
      return (<div>
        <NavBar />
        <p className={styles.peopleCounter}>{contactsCount} {this.getHeader(contactsCount)}</p>
        <Table
          data={tableData.rows}
          columns={tableData.columns}
        />
      </div>);
    }
    return (
      <div>
        <NavBar />
        <div>
          <hr />
          <div className={styles.warningMessage}>
            <p>{this.noContactsMessage}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  private getHeader = (count: number) => {
    if (count > 1) {
      return this.moreThanOneContactsHeader;
    } else {
      return this.oneContactHeader;
    }
  }
}

export default ContactsPage;
import * as React from 'react';
import AggregatedContact from '../../../models/AggregatedContact';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import Table from '../../common/Table/Table';
import NavBar from '../Navbar/Navbar';
import * as styles from './ContactsPageTemplate.css';
import { getTableData } from './ContactsService';
import { isContactsDataValid } from './ContactsUtils';

interface Props {
  contacts: AggregatedContact[];
  domainCustomFields: CustomFieldSetting[];

  loadAggregatedContacts(): void;
}

interface State {
  isModalOpen: boolean;
}

class ContactsPage extends React.Component<Props, State> {
  public domainCustomFields: CustomFieldSetting[];
  public modelName: string;
  public noContactsMessage: string;
  public oneContactHeader: string;
  public moreThanOneContactsHeader: string;
  public columns: any[];
  public signCreateNew: string;

  public state: State = {
    isModalOpen: false,
  };

  public createAddButton = () => <div />;

  public openAddingModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }

  public closeAddingModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  public render() {
    const addingButton = this.createAddButton();

    const { contacts } = this.props;
    const contactsCount = contacts.length;
    if (isContactsDataValid(contacts)) {
      const tableData = getTableData(this.modelName, contacts, this.props.domainCustomFields, this.columns);
      return (<div>
        <NavBar />
        <div className={styles.headingWrapper}>
          {addingButton}
          <p className={styles.peopleCounter}>{contactsCount} {this.getHeader(contactsCount)}</p>
        </div>
        <div className={styles.tableWrapper}>
          <Table
            modelName={this.modelName}
            data={tableData.rows}
            columns={tableData.columns}
          />
        </div>
      </div>);
    }
    return (
      <div>
        <NavBar />
        <div className={styles.headingWrapper}>
          {addingButton}
        </div>
        <hr className={styles.noMarginTop} />
          <div className={styles.warningMessage}>
            <p>{this.noContactsMessage}</p>
            <p className={styles.link} onClick={this.openAddingModal}>
              {this.signCreateNew}
            </p>
          </div>
        <hr />
      </div>
    );
  }

  public componentWillMount()  {
    this.props.loadAggregatedContacts();
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

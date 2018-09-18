import * as React from 'react';
import { connect } from 'react-redux';
import ContactData from '../../../../models/ContactData';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import Table from '../../../../modules/common/Table/Table';
import NavBar from '../../Navbar/Navbar';
import { loadAggregatedContacts } from './contactActions';
import * as styles from './People.css';
import { getTableData } from '../ContactsService';

interface Props {
  contacts: ContactData[];
  domainCustomFields: CustomFieldSetting[];

  loadAggregatedContacts(): void;
}


class People extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadAggregatedContacts();
  };

  public render() {
    const { contacts } = this.props;
    const contactsCount = contacts.length;
    if (this.isExistsContactData(contacts)) {
      const tableData = getTableData('Contact', contacts, this.props.domainCustomFields);
      return (<div>
        <NavBar />
        <p className={styles.peopleCounter}>{contactsCount} {this.getHeader(contactsCount)}</p>
        <Table
          data={tableData.contactsData}
          columns={tableData.contactColumns}
        />
      </div>);
    }
    return (
      <div>
        <NavBar />
        <div>
          <hr />
          <div className={styles.warningMessage}>
            <p>No people added yet</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  private isExistsContactData(contacts: ContactData[]) {
    if (contacts.length > 0) {
      if (contacts[0].owner) {
        return true;
      }
    }
    return false;
  }

  private getHeader = (count: number) => {
    if (count > 1) {
      return 'people';
    } else {
      return 'person';
    }
  };
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
  domainCustomFields: state.domain.settings.customFields,
});

export default connect(mapStateToProps, { loadAggregatedContacts })(People);

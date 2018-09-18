import * as React from 'react';
import { connect } from 'react-redux';
import Contact from '../../../../models/Contact';
import * as columnStyles from '../../../../modules/common/Table/ColumnStyles';
import Table from '../../../../modules/common/Table/Table';
import NavBar from '../../Navbar/Navbar';
import { loadAggregatedContacts } from './contactActions';
import * as styles from './People.css';

interface Props {
  contacts: Contact[];

  loadAggregatedContacts(): void;
}

const columns = [
  {
    dataField: 'custom[0].value',
    ...columnStyles.basicColumnStyles,
    text: 'Email',
  },
  {
    dataField: 'name',
    ...columnStyles.basicColumnStyles,
    text: 'Name',
  },
  {
    dataField: 'organization.name',
    ...columnStyles.basicColumnStyles,
    text: 'Organization',
  },
  {
    dataField: 'custom[1].value',
    ...columnStyles.basicColumnStyles,
    text: 'Phone',
  },
  {
    dataField: 'openedLeads',
    ...columnStyles.rightAlignStyles,
    text: 'Open leads',
  },
  {
    dataField: 'closedLeads',
    ...columnStyles.rightAlignStyles,
    text: 'Closed leads',
  },
  {
    dataField: 'owner.email',
    ...columnStyles.basicColumnStyles,
    text: 'Owner',
  },
];

class People extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadAggregatedContacts();
  };

  public getHeader = (count: number) => {
    if (count > 1) {
      return 'people';
    } else {
      return 'person';
    }
  };

  public render() {
    const { contacts } = this.props;
    const contactsCount = contacts.length;
    if (contactsCount >= 1) {
      return (<div>
        <NavBar />
        <p className={styles.peopleCounter}>{contactsCount} {this.getHeader(contactsCount)}</p>
        <Table
          data={contacts}
          columns={columns}
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
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, { loadAggregatedContacts })(People);

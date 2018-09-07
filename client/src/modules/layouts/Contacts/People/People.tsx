import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../Navbar/Navbar';
import { loadContacts } from '../../../common/autocomplete/contact/contactActions';
import Contact from '../../../../models/Contact';
import Table from '../../../../modules/common/Table/Table';
import * as styles from './People.css';

interface Props {
  contacts: Contact[];

  loadContacts(): void;
}

const columns = [
  {
    dataField: 'custom[1].value',
    text: 'Email',
  },
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'organization.name',
    text: 'Organization',
  },
  {
    dataField: 'custom[0].value',
    text: 'Phone',
  },
  {
    dataField: 'openedLeads',
    text: 'Open leads',
  },
  {
    dataField: 'closedLeads',
    text: 'Closed leads',
  },
  {
    dataField: 'owner.email',
    text: 'Owner',
  },
];

class People extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadContacts();
  };

  public render() {
    const contactsLenght = this.props.contacts.length;
    if (contactsLenght >= 1) {
      return (<div>
        <NavBar />
        <p className={styles.peopleCounter}>{contactsLenght}{contactsLenght > 1 ? ' people' : ' person'}</p>
        <Table
          data={this.props.contacts}
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

export default connect(mapStateToProps, { loadContacts })(People);

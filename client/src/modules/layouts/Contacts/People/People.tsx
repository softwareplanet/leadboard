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
    dataField: 'custom[1].value',
    text: 'Email',
  },
  {
    dataField:'openedLeads',
    text:'Open leads'
  },
  {
    dataField:'closedLeads',
    text:'Closed leads',
  }
];

class People extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadContacts();
  };

  public render() {
    return (
      <div>
        <NavBar />
        <p className={styles.peopleCounter}>{this.props.contacts.length} people</p>
        <Table
          data={this.props.contacts}
          columns={columns}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, { loadContacts })(People);

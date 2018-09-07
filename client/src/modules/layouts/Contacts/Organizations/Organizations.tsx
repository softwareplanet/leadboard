import * as React from 'react';
import { connect } from 'react-redux';
import Organization from '../../../../models/Organization';
import Table from '../../../../modules/common/Table/Table';
import { loadOrganizations } from '../../../common/autocomplete/organization/organizationActions';
import NavBar from '../../Navbar/Navbar';
import * as styles from './Organizations.css';

interface Props {
  organizations: Organization[];

  loadOrganizations(): void;
}

const columns = [
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'custom[0].value',
    text: 'Address',
  },
  {
    dataField: 'contacts',
    text: 'People',
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

class Organizations extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadOrganizations();
  };

  public render() {
    const oraganizationsCount = this.props.organizations.length;
    if (oraganizationsCount >= 1) {
      return (
        <div>
          <NavBar />
          <p className={styles.organizationsCounter}>{this.props.organizations.length} organization</p>
          <Table
            data={this.props.organizations}
            columns={columns}
          />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <div>
            <hr />
            <div className={styles.warningMessage}>
              <p>No organizations added yet</p>
            </div>
          </div>
          <hr />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: any) => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, { loadOrganizations })(Organizations);

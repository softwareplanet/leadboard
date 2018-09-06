import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../Navbar/Navbar';
import { loadOrganizations } from '../../../common/autocomplete/organization/organizationActions';
import Table from '../../../../modules/common/Table/Table';
import * as styles from './Organizations.css';
import Organization from '../../../../models/Organization';

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
];

class Organizations extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadOrganizations();
  };

  public render() {
    return (
      <div>
        <NavBar />
        <p className={styles.peopleCounter}>{this.props.organizations.length} organization</p>
        <Table
          data={this.props.organizations}
          columns={columns}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, { loadOrganizations })(Organizations);

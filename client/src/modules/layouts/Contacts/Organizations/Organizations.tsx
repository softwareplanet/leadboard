import * as React from 'react';
import { connect } from 'react-redux';
import Organization from '../../../../models/Organization';
import Table from '../../../../modules/common/Table/Table';
import { loadAggregatedOrganizations } from './organizationActions';
import NavBar from '../../Navbar/Navbar';
import * as styles from './Organizations.css';
import * as columnStyles from '../../../common/Table/ColumnStyles';

interface Props {
  organizations: Organization[];

  loadAggregatedOrganizations(): void;
}

const columns = [
  {
    dataField: 'name',
    headerStyle: columnStyles.basicHeaderStyle,
    style: columnStyles.basicColumnStyle,
    text: 'Name',
  },
  {
    dataField: 'custom[0].value',
    headerStyle: columnStyles.basicHeaderStyle,
    style: columnStyles.basicColumnStyle,
    text: 'Address',
  },
  {
    dataField: 'contacts',
    headerStyle: columnStyles.rightAliginHeaderStyle,
    style: columnStyles.rightAlignColumnStyle,
    text: 'People',
  },
  {
    dataField: 'openedLeads',
    headerStyle: columnStyles.rightAliginHeaderStyle,
    style: columnStyles.rightAlignColumnStyle,
    text: 'Open leads',
  },
  {
    dataField: 'closedLeads',
    headerStyle: columnStyles.rightAliginHeaderStyle,
    style: columnStyles.rightAlignColumnStyle,
    text: 'Closed leads',
  },
  {
    dataField: 'owner.email',
    headerStyle: columnStyles.basicHeaderStyle,
    style: columnStyles.basicColumnStyle,
    text: 'Owner',
  },
];

class Organizations extends React.Component<Props, object> {
  public componentWillMount = () => {
    this.props.loadAggregatedOrganizations();
  };

  public getHeader = (count: number) => {
    if (count > 1) {
      return 'organizations';
    } else {
      return 'organization';
    }
  };

  public render() {
    const { organizations } = this.props;
    const organizationsCount = organizations.length;
    if (organizationsCount >= 1) {
      return (
        <div>
          <NavBar />
          <p className={styles.organizationsCounter}>{organizationsCount} {this.getHeader(organizationsCount)} </p>
          <Table
            data={organizations}
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

export default connect(mapStateToProps, { loadAggregatedOrganizations })(Organizations);

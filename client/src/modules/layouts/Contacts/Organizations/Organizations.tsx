import * as React from 'react';
import { connect } from 'react-redux';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import OrganizationData from '../../../../models/OrganizationData';
import Table from '../../../../modules/common/Table/Table';
import NavBar from '../../Navbar/Navbar';
import { getTableData } from '../ContactsService';
import { isContactsDataValid } from '../ContactsUtils';
import { loadAggregatedOrganizations } from './organizationActions';
import * as styles from './Organizations.css';

interface Props {
  organizations: OrganizationData[];
  domainCustomFields: CustomFieldSetting[];

  loadAggregatedOrganizations(): void;
}

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
    if (isContactsDataValid(organizations)) {
      const tableData = getTableData('Organization', organizations, this.props.domainCustomFields);
      return (
        <div>
          <NavBar />
          <p className={styles.organizationsCounter}>{organizationsCount} {this.getHeader(organizationsCount)} </p>
          <Table
            data={tableData.contactsData}
            columns={tableData.contactColumns}
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
  domainCustomFields: state.domain.settings.customFields,
  organizations: state.organizations,
});

export default connect(mapStateToProps, { loadAggregatedOrganizations })(Organizations);

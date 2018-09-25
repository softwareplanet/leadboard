import * as React from 'react';
import { connect } from 'react-redux';
import Contact from '../../../../models/Contact';
import Organization from '../../../../models/Organization';
import * as detailedViewStyles from '../../detailedView.css';
import { loadContactsForOrganization } from '../detailedOrganizationActions';
import OrganizationContactsCard from './OrganizationContactsCard/OrganizationContactsCard';

interface Props {
  contacts: Contact[];
  organization: Organization;

  loadContactsForOrganization(organizationId: string): void;
}

class OrganizationSidebar extends React.Component<Props> {

  public componentWillMount() {
    this.props.loadContactsForOrganization(this.props.organization._id);
  }

  public render() {
    return (
      <div className={detailedViewStyles.sidebar}>
        Sidebar
        <OrganizationContactsCard contacts={this.props.contacts} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contacts: state.organization.detailedOrganization.contacts,
});

export { OrganizationSidebar };

export default connect(mapStateToProps,
  { loadContactsForOrganization })
(OrganizationSidebar);

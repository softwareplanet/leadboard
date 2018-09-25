import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import { loadOrganization } from './detailedOrganizationActions';
import OrganizationContent from './OrganizationContent/OrganizationContent';
import OrganizationSidebar from './OrganizationSidebar/OrganizationSidebar';
import OrganizationModel from '../../../models/Organization';

interface Props extends RouteComponentProps<{ organizationId: string }> {
  organization: OrganizationModel;

  loadOrganization(id: string): void;
}

class Organization extends React.Component<Props, object> {

  public render() {
    const displayFlex = {
      display: 'flex',
    };

    return (
      <div>
        <Navbar />
        <div style={displayFlex}>
          <DetailedViewHeader modelType="Organization" model={this.props.organization}/>
        </div>
        <div style={displayFlex}>
          <OrganizationSidebar />
          <OrganizationContent />
        </div>
      </div>
    );
  }

  public componentWillMount() {
    const organizationId = this.props.match.params.organizationId;
    this.props.loadOrganization(organizationId);
  }
}

const mapStateToProps = (state: any) => ({
  organization: state.organization.detailedOrganization.organization,
});

export default connect(mapStateToProps, { loadOrganization })(Organization);

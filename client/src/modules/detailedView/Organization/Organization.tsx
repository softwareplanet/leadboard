import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { loadOrganization } from './detailedOrganiaztionActions';
import Navbar from '../../layouts/Navbar/Navbar';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import OrganizationContent from './OrganizationContent/OrganizationContent';
import OrganizationSidebar from './OrganizationSidebar/OrganizationSidebar';

interface Props extends RouteComponentProps<any> {
  loadOrganization(id: string): void;
};

class Organization extends React.Component<Props, object> {

  public render() {
    const displayFlex = {
      display: 'flex',
    };

    return (
      <div>
        <Navbar />
        <div style={displayFlex}>
          <DetailedViewHeader />
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
  };
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, { loadOrganization })(Organization);

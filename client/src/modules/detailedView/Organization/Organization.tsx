import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import OrganizationModel from '../../../models/Organization';
import Navbar from '../../layouts/Navbar/Navbar';
import { loadNotes } from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteActions';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import { loadOrganization, updateOrganization } from './detailedOrganizationActions';
import OrganizationContent from './OrganizationContent/OrganizationContent';
import OrganizationSidebar from './OrganizationSidebar/OrganizationSidebar';

interface Props extends RouteComponentProps<{ organizationId: string }> {
  organization: OrganizationModel;

  loadOrganization(id: string): void;

  updateOrganization(organization: any): void;

  loadNotes(modelName: string, id: string): void;
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
          <DetailedViewHeader
            modelUpdateAction={this.props.updateOrganization}
            modelType="Organization"
            model={this.props.organization}
          />
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
    this.props.loadNotes('organization', organizationId);
  }
}

const mapStateToProps = (state: any) => ({
  organization: state.organization.detailedOrganization.organization,
});

export default connect(
  mapStateToProps,
  { loadNotes, loadOrganization, updateOrganization },
)(Organization);

import * as React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../layouts/Navbar/Navbar';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import OrganizationContent from './OrganizationContent/OrganizationContent';
import OrganizationSidebar from './OrganizationSidebar/OrganizationSidebar';

class Organization extends React.Component {

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
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Organization);

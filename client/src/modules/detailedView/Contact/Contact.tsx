import * as React from 'react';
import Navbar from '../../layouts/Navbar/Navbar';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import ContactContent from './ContactContent/ContactContent';
import ContactSidebar from './ContactSidebar/ContactSidebar';
import { connect } from 'react-redux';
class Contact extends React.Component {

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
          <ContactSidebar />
          <ContactContent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Contact);

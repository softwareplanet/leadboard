import * as React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../layouts/Navbar/Navbar';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import ContactContent from './ContactContent/ContactContent';
import ContactSidebar from './ContactSidebar/ContactSidebar';
import { loadContactById } from '../../layouts/Contacts/People/contactActions';
import { RouteComponentProps } from 'react-router';
import ContactModel from '../../../models/Contact';

interface Props extends RouteComponentProps<{contactId: string}>{
  contact: ContactModel;

  loadContactById(contact: string): void;
}
class Contact extends React.Component<Props> {

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

  public componentWillMount() {
    this.props.loadContactById(this.props.match.params.contactId);
  }
}

const mapStateToProps = (state: any) => ({
  contact: state.contacts.detailedContact.contact,
});

export default connect(mapStateToProps, { loadContactById })(Contact);

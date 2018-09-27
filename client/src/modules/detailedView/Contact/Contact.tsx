import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ContactModel from '../../../models/Contact';
import Navbar from '../../layouts/Navbar/Navbar';
import { loadNotes } from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteActions';
import DetailedViewHeader from '../DetailedViewHeader/DetailedViewHeader';
import ContactContent from './ContactContent/ContactContent';
import ContactSidebar from './ContactSidebar/ContactSidebar';
import { loadContact, updateContact } from './detailedContactActions';
import { loadActivities } from '../../lead/EditLead/Activities/activityActions';

interface Props extends RouteComponentProps<{ contactId: string }> {
  contact: ContactModel;

  loadContact(contactId: string): void;

  loadNotes(modelName: string, modelId: string): void;

  updateContact(contact: any): void;

  loadActivities(modelName: string, modelId: string): void;
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
          <DetailedViewHeader
            modelUpdateAction={this.props.updateContact}
            modelType="Contact"
            model={this.props.contact}
          />
        </div>
        <div style={displayFlex}>
          <ContactSidebar />
          <ContactContent />
        </div>
      </div>
    );
  }

  public componentWillMount() {
    const { contactId } = this.props.match.params;
    this.props.loadContact(contactId);
    this.props.loadNotes('contact', contactId);
    this.props.loadActivities('participants', contactId);
  }
}

const mapStateToProps = (state: any) => ({
  contact: state.contact.detailedContact.contact,
});

export default connect(
  mapStateToProps,
  {
    loadActivities,
    loadContact,
    loadNotes,
    updateContact,
  },
)(Contact);

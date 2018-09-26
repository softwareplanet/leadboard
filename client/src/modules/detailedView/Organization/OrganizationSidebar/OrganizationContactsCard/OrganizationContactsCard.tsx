import * as React from 'react';
import { Link } from 'react-router-dom';
import contactIcon from '../../../../../assets/img/contacts-icon.svg';
import Contact from '../../../../../models/Contact';
import AllContactsModal from '../AllContactsModal/AllContactsModal';
import * as styles from './OrganizationContactsCard.css';

interface Props {
  contacts: Contact[];
}

interface State {
  isAllContactModalOpen: boolean;
}

class OrganizationContactsCard extends React.Component<Props, State> {

  public state: State = {
    isAllContactModalOpen: false,
  };

  public render() {
    const { contacts } = this.props;
    const MAX_CONTACTS_LENGTH = 10;
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeading}>
          <div className={styles.cardHeader}>
            PEOPLE ({this.props.contacts ? this.props.contacts.length : 0})
          </div>
        </div>
        <div className={styles.cardBody}>
          {contacts.length === 0 ? 'There are no people in this organization' : undefined}
          {contacts.slice(0, MAX_CONTACTS_LENGTH).map((contact: Contact) => (
            <div className={styles.contact}>
              <img src={contactIcon} className={styles.contactIcon} alt={'contact-icon'} />
              <Link to={`/contact/${contact._id}`} className={styles.contactName}>
                {contact.name}
              </Link>
            </div>
          ))}
          {contacts.length > MAX_CONTACTS_LENGTH
            ? <div>
              +{contacts.length - MAX_CONTACTS_LENGTH} more
            </div>
            : undefined}
        </div>
        <div className={styles.actions}>
          {contacts.length !== 0
            ? <button className={styles.buttonViewAll} onClick={this.openModal}>
              View all
              <AllContactsModal
                isModalOpen={this.state.isAllContactModalOpen}
                openModal={this.openModal}
                closeModal={this.closeModal}
              />
            </button>
            : undefined}
        </div>
      </div>
    );
  }

  private openModal = () => {
    this.setState({ isAllContactModalOpen: true });
  }

  private closeModal = () => {
    this.setState({ isAllContactModalOpen: false });
  }
}

export default OrganizationContactsCard;

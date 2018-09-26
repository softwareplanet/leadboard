import * as React from 'react';
import { Link } from 'react-router-dom';
import contactIcon from '../../../../../assets/img/contacts-icon.svg';
import Contact from '../../../../../models/Contact';
import * as styles from './OrganizationContactsCard.css';

interface Props {
  contacts: Contact[];
}

class OrganizationContactsCard extends React.Component<Props> {

  public render() {
    const { contacts } = this.props;
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeading}>
          <div className={styles.cardHeader}>
            PEOPLE ({this.props.contacts ? this.props.contacts.length : 0})
          </div>
        </div>
        <div className={styles.cardBody}>
          {contacts.length === 0 ? 'There are no people in this organization' : undefined}
          {contacts.map((contact: Contact) => (
            <div className={styles.contact}>
              <img src={contactIcon} className={styles.contactIcon} alt={'contact-icon'} />
              <Link to={`/contact/${contact._id}`} className={styles.contactName}>
                {contact.name}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.buttonViewAll}>View all</button>
        </div>
      </div>
    );
  }
}

export default OrganizationContactsCard;

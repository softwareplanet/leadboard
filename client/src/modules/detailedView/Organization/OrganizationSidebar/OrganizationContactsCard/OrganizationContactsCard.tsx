import * as React from 'react';
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
            <div>
              <div>${contact.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OrganizationContactsCard;

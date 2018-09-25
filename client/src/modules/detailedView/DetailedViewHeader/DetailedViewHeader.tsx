import * as React from 'react';
import ownerIcon from '../../../assets/img/user-icon.svg';
import organizationIcon from '../../../assets/img/organizationIcon.svg';
import personIcon from '../../../assets/img/personIcon.svg';
import Contact from '../../../models/Contact';
import Organization from '../../../models/Organization';
import * as styles from './DetailedViewHeader.css';
import * as leadHeaderStyles from '../../lead/EditLead/EditLeadHeader/EditLeadHeader.css';

interface Props {
  model: Organization | Contact;
  modelType: string;
}

const displayFlex = {
  display: 'flex',
};

export default class DetailedViewHeader extends React.Component<Props> {

  public render() {
    const iconSrc = this.props.modelType === 'Organization' ? organizationIcon : personIcon;
    return (
      <div className={styles.header}>
        <div style={displayFlex}>
          <span className={styles.badge}>
            <img className={styles.icon} src={iconSrc} alt="Icon" />
          </span>
          <h1 className={styles.name}>{this.props.model.name}</h1>
        </div>
        <div className={leadHeaderStyles.leadOptions}>
          <div className={leadHeaderStyles.owner}>
            <img src={ownerIcon} className={leadHeaderStyles.ownerPicture} />
            <div className={leadHeaderStyles.ownerBody}>
              {/* <span>{editLead ? editLead.owner.firstname + '' + editLead.owner.lastname : null}</span> */}
              <small className={leadHeaderStyles.ownerRole}>Owner</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

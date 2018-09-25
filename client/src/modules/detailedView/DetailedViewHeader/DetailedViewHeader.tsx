import * as React from 'react';
import organizationIcon from '../../../assets/img/organizationIcon.svg';
import personIcon from '../../../assets/img/personIcon.svg';
import Contact from '../../../models/Contact';
import Organization from '../../../models/Organization';
import * as styles from './DetailedViewHeader.css';

interface Props {
  model: Organization | Contact;
  modelType: string;
}

export default class DetailedViewHeader extends React.Component<Props> {

  public render() {
    const iconSrc = this.props.modelType === 'Organization' ? organizationIcon : personIcon;
    return (
      <div className={styles.header}>
        <span className={styles.badge}>
          <img className={styles.icon} src={iconSrc} alt="Icon" />
        </span>
        <h1 className={styles.name}>{this.props.model.name}</h1>
      </div>
    );
  }
}

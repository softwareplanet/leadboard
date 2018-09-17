import * as React from 'react';
import { Link } from 'react-router-dom';
import activeIcon from '../../../../assets/lead-activity/active-icon.png';
import overdueIcon from '../../../../assets/lead-activity/overdue-icon.png';
import plannedIcon from '../../../../assets/lead-activity/planned-icon.png';
import warningIcon from '../../../../assets/lead-activity/warning-icon.png';
import profile from '../../../../img/profile.svg';
import LeadModel from '../../../../models/Lead';
import { ACTIVE, NOACTIVITY, OVERDUE, PLANNED } from '../activityStatuses';
import * as styles from './Lead.css';

interface Props {
  lead: LeadModel,
  link: string,
  activityStatus: string,
}

export default class Lead extends React.Component<Props, object> {

  public render() {
    const lead = this.props.lead;
    const link = this.props.link;
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <Link className={styles.linkInfo} to={link}>
            <strong><img className={styles.avatar}
                         src={lead.owner && lead.owner.avatar ? lead.owner.avatar : profile}/>
              {lead.name}
            </strong>
            <small>{this.getContactOrOrganizationName(lead)}</small>
          </Link>
          <div className={styles.imgContainer}>
            <a className={styles.iconStatus}>
              <img src={this.getStatusIcon(this.props.activityStatus)}/>
            </a>
          </div>
        </div>
      </div>
    );
  }

  private getContactOrOrganizationName(lead : LeadModel): string {
    if(lead.contact) {
      return lead.contact.name;
    } else if(lead.organization) {
      return lead.organization.name;
    }
    return '';
  }

  private getStatusIcon = (status: string) => {
    switch (status) {
      case NOACTIVITY :
        return warningIcon;
      case OVERDUE :
        return overdueIcon;
      case PLANNED :
        return plannedIcon;
      case ACTIVE :
        return activeIcon;
      default :
        return warningIcon;
    }
  };

};

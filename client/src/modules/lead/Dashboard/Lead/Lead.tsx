import * as React from 'react';
import { Link } from 'react-router-dom';
import activeIcon from '../../../../assets/lead-activity/active-icon.png';
import overdueIcon from '../../../../assets/lead-activity/overdue-icon.png';
import plannedIcon from '../../../../assets/lead-activity/planned-icon.png';
import warningIcon from '../../../../assets/lead-activity/warning-icon.png';
import profile from '../../../../img/profile.svg';
import LeadModel from '../../../../models/Lead';
import { Active, NoActivity, Overdue, Planned } from '../activityStatuses';
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
            <small>{lead.contact ? lead.contact.name : lead.organization.name}</small>
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

  private getStatusIcon = (status: string) => {
    switch (status) {
      case NoActivity :
        return warningIcon;
      case Overdue :
        return overdueIcon;
      case Planned :
        return plannedIcon;
      case Active :
        return activeIcon;
      default :
        return warningIcon;
    }
  };

};

import * as React from 'react';
import { Link } from 'react-router-dom';
import profile from '../../../../img/profile.svg';
import LeadModel from '../../../../models/Lead';
import * as styles from './Lead.css';

interface Props {
  lead: LeadModel,
  link: string,
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
        </div>
      </div>
    );
  }
};

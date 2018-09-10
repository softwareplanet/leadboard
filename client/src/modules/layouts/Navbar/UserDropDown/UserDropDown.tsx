// import * as  classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as styles from './UserDropDown.css';



interface Props extends RouteComponentProps<any> {
  renderAvatar(): void;
}

class ContactsDropDown extends React.Component<Props, object> {

  public isActive = () => {
    const { location } = this.props;
    if (location.pathname === '/people' || location.pathname === '/organizations') {
      return styles.activeContacts;
    } else {
      return undefined;
    }
  };

  public render() {
    return (
      <div>
        {this.props.renderAvatar()}
        <div className={styles.userInfo}>
          <span>{this.props.auth.userName}</span>
          <small>{this.props.auth.domainName}</small>
        </div>
        <div className={styles.dropDownIcon}>
          <ReactSVG src={dropMenuIcon} />
        </div>
      </div>
    );
  }
}

export default withRouter(ContactsDropDown);

import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { logoutUser } from '../../auth/authActions';
import ContactsDropDown from './ContactsDropDown/ContactsDropDown';
import dealsIconActive from '../../../assets/deals-icon-active.svg';
import dealsIcon from '../../../assets/deals-icon.svg';
import { logoutUser } from '../../auth/authActions';
import * as styles from './Navbar.css';
import Search from './Search/Search';
import UserDropDown from './UserDropDown/UserDropDown';

const leadsRoute = '/home';

interface Props extends RouteComponentProps<any> {
  auth: any;

  logoutUser(history: any): void;
}

class Navbar extends React.Component<Props, object> {
  public onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  public getDealsIcon = () => {
    return this.props.location.pathname === leadsRoute ? dealsIconActive : dealsIcon;
  };

  public render() {
    return (
      <header>
        <ul className={styles.menu} role="navigation">
          <li className={styles.logo}><Link to={leadsRoute}>Leadboard</Link></li>
          <li className={styles.logoSmall}><Link to={leadsRoute}><h1>L</h1></Link></li>
          <Search history={this.props.history} />
          <NavLink
            className={styles.link}
            activeClassName={styles.currentLink}
            to={leadsRoute}>
            <div>
              <img
                className={styles.icon}
                src={this.getDealsIcon()}
                alt="leads"
              />
              Leads
            </div>
          </NavLink>
          <ContactsDropDown />
          <li className={styles.rightItem}>
            <UserDropDown />
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export { Navbar };
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

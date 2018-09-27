import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import dealsIconActive from '../../../assets/img/deals-icon-active.svg';
import dealsIcon from '../../../assets/img/deals-icon.svg';
import Funnel from '../../../models/Funnel';
import { logoutUser } from '../../auth/authActions';
import ContactsDropDown from './ContactsDropDown/ContactsDropDown';
import * as styles from './Navbar.css';
import Search from './Search/Search';
import UserDropDown from './UserDropDown/UserDropDown';

interface Props extends RouteComponentProps<any> {
  auth: any;
  activeFunnel: Funnel;

  logoutUser(history: any): void;
}

class Navbar extends React.Component<Props, object> {
  public onLogout = () => {
    this.props.logoutUser(this.props.history);
  }

  public render() {
    const leadsRoute = `/pipelines/${this.props.activeFunnel._id}`;

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
                src={this.props.location.pathname === leadsRoute ?
                  dealsIconActive :
                  dealsIcon}
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
  activeFunnel: state.dashboard.activeFunnel,
  auth: state.auth,
});

export { Navbar };
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

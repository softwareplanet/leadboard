import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import contactIcon from '../../../assets/contacts-icon.svg';
import dealsIconActive from '../../../assets/deals-icon-active.svg';
import dealsIcon from '../../../assets/deals-icon.svg';
import profileIcon from '../../../assets/header-profile.svg';
import { logoutUser } from '../../auth/authActions';
import * as styles from './Navbar.css';
import Search from './Search/Search';

const leadsRoute = '/home';
const peopleRoute = '/people';

interface Props extends RouteComponentProps<any> {
  auth: any;
  logoutUser(history: any): void;
}

interface State {
  isDropdownOpen: boolean;
}

class Navbar extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
  };

  public toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  public renderUserAvatar = () => {
    return this.props.auth && this.props.auth.avatar ?
      <img className={styles.userImg} src={this.props.auth.avatar} alt="user" /> :
      <img className={styles.defaultImg} src={profileIcon} alt="user" />;
  };

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
              <img className={styles.icon}
                   src={this.getDealsIcon()} alt="leads" />Leads
            </div>
          </NavLink>
          <div className={this.props.location.pathname === '/people' ? styles.activeContacts : undefined}>
            <Dropdown
              className={this.state.isDropdownOpen ? styles.openedDropDown : styles.closedDropDown}
              isOpen={this.state.isDropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle
                className={styles.dropDownToggle}
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.isDropdownOpen}
              >
                <span><ReactSVG className={styles.contactIcon} src={contactIcon} /></span>
                <span className={styles.linkText}>Contacts</span>
              </DropdownToggle>
              <DropdownMenu className={styles.dropDownMenu}>
                <NavLink onClick={this.toggle} to={peopleRoute}>
                  <div className={styles.menuItemDataWrapper}>
                    <ReactSVG className={styles.peopleIcon} src={contactIcon} />People
                  </div>
                </NavLink>
              </DropdownMenu>
            </Dropdown>
          </div>
          <li className={styles.rightItem}>
            <div>
              {this.renderUserAvatar()}
              <div className={styles.userInfo}>
                <span>{this.props.auth.userName}</span>
                <small>{this.props.auth.domainName}</small>
              </div>
            </div>
          </li>
          <li id="logout" onClick={this.onLogout} className={styles.item}>
            <div>
              Logout
            </div>
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

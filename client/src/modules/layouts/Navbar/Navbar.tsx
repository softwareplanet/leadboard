import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import contactIcon from '../../../assets/contacts-icon.svg';
import dealsIconActive from '../../../assets/deals-icon-active.svg';
import dealsIcon from '../../../assets/deals-icon.svg';
import * as styles from './Navbar.css';
import UserDropDown from './UserDropDown/UserDropDown'

const leadsRoute = '/home';
const peopleRoute = '/people';

interface State {
  isDropdownOpen: boolean;
}

class Navbar extends React.Component<any, State> {
  public state: State = {
    isDropdownOpen: false,
  };

  public toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
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
          
          
          <div className={styles.rightItem}>
            <UserDropDown />
          </div>
          {/* <li id="logout" onClick={this.onLogout} className={styles.item}>
            <div>
              Logout
            </div>
          </li> */}
        </ul>
      </header>
    );
  }
}

export { Navbar };
export default withRouter(Navbar);

import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import contactIcon from '../../../../assets/contacts-icon.svg';
import organizationIcon from '../../../../assets/organization-icon.svg';
import * as styles from './ContactsDropDown.css';
const peopleRoute = '/people';
const organizationsRoute = '/organizations';

interface Props extends RouteComponentProps<any> {
}

interface State {
  isDropdownOpen: boolean;
}

class ContactsDropDown extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
  };

  public toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  public render() {
    return (
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
                <NavLink onClick={this.toggle} to={organizationsRoute}>
                  <div className={styles.menuItemDataWrapper}>
                    <ReactSVG className={styles.organizationIcon} src={organizationIcon} />Organizations
                  </div>
                </NavLink>
              </DropdownMenu>
            </Dropdown>
          </div>
    );
  }
}
export default  withRouter(ContactsDropDown);

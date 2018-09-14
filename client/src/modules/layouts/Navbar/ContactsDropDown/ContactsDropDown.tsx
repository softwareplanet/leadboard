import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
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

  public isActive = () => {
    const { location } = this.props;
    if (location.pathname === '/people' || location.pathname === '/organizations') {
      return styles.activeContacts;
    } else {
      return styles.notActiveContacts;
    }
  };

  public toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  public render() {
    return (
      <div className={this.isActive()}>
        <Dropdown
          className={this.state.isDropdownOpen ? styles.openedDropDown : styles.closedDropDown}
          isOpen={this.state.isDropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            tag={'div'}
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={this.state.isDropdownOpen}
          >
            <div className={styles.dropDownToggle}>
              <span><ReactSVG className={styles.contactIcon} src={contactIcon} /></span>
              Contacts
            </div>
          </DropdownToggle>
          <DropdownMenu className={styles.dropDownMenu}>
            <Link onClick={this.toggle} to={peopleRoute}>
              <div className={styles.menuItemDataWrapper}>
                <ReactSVG className={styles.peopleIcon} src={contactIcon} />People
              </div>
            </Link>
            <Link className={styles.dropDownItem} to={organizationsRoute}>
              <div className={styles.menuItemDataWrapper}>
                <ReactSVG className={styles.organizationIcon} src={organizationIcon} />Organizations
              </div>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(ContactsDropDown);

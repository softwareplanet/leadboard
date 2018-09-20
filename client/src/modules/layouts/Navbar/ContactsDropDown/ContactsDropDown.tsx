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

  public render() {
    return (
      <div className={this.getStyles()}>
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

  private getStyles = () => {
    const { location } = this.props;
    if ([peopleRoute, organizationsRoute].includes(location.pathname)) {
      return styles.activeContacts;
    } else {
      return styles.notActiveContacts;
    }
  };

  private toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };
}

export default withRouter(ContactsDropDown);

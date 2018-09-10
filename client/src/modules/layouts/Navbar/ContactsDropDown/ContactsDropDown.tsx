import * as  classNames from 'classnames';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import contactIcon from '../../../../assets/contacts-icon.svg';
import organizationIcon from '../../../../assets/organization-icon.svg';
import * as styles from './ContactsDropDown.css';

const peopleRoute = '/people';
const organizationsRoute = '/organizations';

interface Props extends RouteComponentProps<any> {
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
      <div className={this.isActive()}>
        <div className={styles.dropDown}>
          <button className="dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span><ReactSVG className={styles.contactIcon} src={contactIcon} /></span>
            Contacts
          </button>
          <div className={classNames('dropdown-menu', styles.dropDownMenu)} aria-labelledby="dropdownMenuButton">
            <Link className={styles.dropDownItem} to={peopleRoute}>
              <ReactSVG className={styles.peopleIcon} src={contactIcon} />People
            </Link>
            <Link className={styles.dropDownItem} to={organizationsRoute}>
              <ReactSVG className={styles.organizationIcon} src={organizationIcon} />Organizations
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ContactsDropDown);

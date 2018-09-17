import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import dropMenuIcon from '../../../../assets/drop-menu-icon.svg';
import profileIcon from '../../../../assets/header-profile.svg';
import logoutIcon from '../../../../assets/logout-icon.svg';
import settingsIcon from '../../../../assets/settings-icon.svg';
import { logoutUser } from '../../../auth/authActions';
import * as styles from './UserDropDown.css';

interface Props extends RouteComponentProps<any> {
  auth: any;

  logoutUser(history: any): void;
}

interface State {
  isDropdownOpen: boolean;
}

const settingsRoute = '/settings/funnels';

class UserDropDown extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
  };

  public renderUserAvatar = () => {
    return this.props.auth && this.props.auth.avatar ?
      <img
        className={styles.userImg}
        src={this.props.auth.avatar}
        alt="user"
      /> :
      <img
        className={styles.defaultImg}
        src={profileIcon}
        alt="user"
      />;
  };

  public onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  public render() {
    const { isDropdownOpen } = this.state;
    return (
      <div>
        <Dropdown
          className={isDropdownOpen ? styles.openedUserDropDown : styles.closedUserDropDown}
          isOpen={isDropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            tag={'div'}
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={isDropdownOpen}
          >
            <div className={styles.dropDownToggle}>
              {this.renderUserAvatar()}
              <div className={styles.userInfo}>
                <span>{this.props.auth.userName}</span>
                <small className={styles.domainName}>{this.props.auth.domainName}</small>
              </div>
              <div className={styles.dropDownIcon}>
                <ReactSVG src={dropMenuIcon} />
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu className={styles.userDropDownMenu} tag={'span'} right={true}>
            <DropdownItem className={styles.userDropDownItem} onClick={this.onLogout} id="logout">
              <div className={styles.menuItemIcon}>
                <ReactSVG src={logoutIcon} />
              </div>
              <span>Log out</span>
            </DropdownItem>
            <Link to={settingsRoute}>
              <DropdownItem className={styles.userDropDownItem} id="settings">
                <ReactSVG src={settingsIcon} className={styles.menuItemIcon} />
                <span>Settings</span>
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  private toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export { UserDropDown };
export default connect(mapStateToProps, { logoutUser })(withRouter(UserDropDown));

import * as  classNames from 'classnames';
import * as React from 'react';
import * as styles from './UserDropDown.css';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactSVG from 'react-svg';
import dropMenuIcon from '../../../../assets/drop-menu-icon.svg';
import profileIcon from '../../../../assets/header-profile.svg';
import logoutIcon from '../../../../assets/logout-icon.svg';
import { logoutUser } from '../../../auth/authActions';

interface Props extends RouteComponentProps<any> {
  auth: any;
  logoutUser(history: any): void;
}

class UserDropDown extends React.Component<Props, object> {

  public renderUserAvatar = () => {
    return this.props.auth && this.props.auth.avatar ?
      <img
        className={styles.userImg}
        src={this.props.auth.avatar}
        alt="user"
      /> :
      <img className={styles.defaultImg}
        src={profileIcon}
        alt="user"
      />;
  };

  public onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  public render() {
    return (
      <div className={styles.userDropDown}>
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
        >
          {this.renderUserAvatar()}
          <div className={styles.userInfo}>
            <span>{this.props.auth.userName}</span>
            <small>{this.props.auth.domainName}</small>
          </div>
          <div className={styles.dropDownIcon}>
            <ReactSVG src={dropMenuIcon} />
          </div>
        </button>
        <ul
          className={classNames('dropdown-menu dropdown-menu-right', styles.userDropDownMenu)}
          aria-labelledby="dropdownUserButton"
        >
          <li className={'dropdown-divider'} />
          <li
            onClick={this.onLogout}
            id="logout"
            className={styles.userDropDownItem}
          >
            <div className={styles.logoutIcon}>
              <ReactSVG src={logoutIcon} />
            </div>
            <span>Log out</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export { UserDropDown };
export default connect(mapStateToProps, { logoutUser })(withRouter(UserDropDown));

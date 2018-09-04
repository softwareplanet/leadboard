import * as React from "react";
import { connect } from "react-redux";
import { Link, NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import dealsIconActive from "../../../assets/deals-icon-active.svg";
import dealsIcon from "../../../assets/deals-icon.svg";
import profileIcon from "../../../assets/header-profile.svg";
import User from "../../../models/User";
import { logoutUser } from "../../auth/authActions";
import * as styles from "./Navbar.css";

const leadsRoute = "/home";

interface Props extends RouteComponentProps<any> {
  user: User;
  auth: any;
  logoutUser(history: any): void;
}

class Navbar extends React.Component<Props, object> {
  public renderUserAvatar = () => {
    return this.props.user && this.props.user.avatar ?
      <img className={styles.userImg} src={this.props.user.avatar} alt="user" /> :
      <img className={styles.defaultImg} src={profileIcon} alt="user" />;
  };

  public onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  public getDealsIcon = () => {
    return this.props.location.pathname === leadsRoute ?
      dealsIconActive :
      dealsIcon;
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
  auth: state.auth
});

export { Navbar };
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

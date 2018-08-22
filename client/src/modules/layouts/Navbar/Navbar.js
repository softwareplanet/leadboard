import React, { Component } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import styles from "./Navbar.css";
import { logoutUser } from "../../auth/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dealsIcon from "../../../assets/deals-icon.svg"
import profileIcon from "../../../assets/header-profile.svg"

const leadsRoute = "/home";

class Navbar extends Component {
  renderUserAvatar = () => {
    return this.props.user && this.props.user.avatar ?
      <img className={styles.userImg} src={this.props.user.avatar} alt="user" /> :
      <div className={styles.defaultImgContainer}><img src={profileIcon} alt="user" /></div>
  };

  render() {
    return (
      <header>
        <ul className={styles.menu} role="navigation">

          <li className={styles.logo}><Link to={leadsRoute}>Leadboard</Link></li>
          <li className={styles.logoSmall}><Link to={leadsRoute}><h1>L</h1></Link></li>

          <li id="deals" className={this.props.location.pathname === leadsRoute ? styles.active : styles.itemWithLink}>
            <NavLink
              className={styles.link}
              activeClassName={styles.currentLink}
              to={leadsRoute}>
              <div>
                <img className={styles.icon} src={dealsIcon} alt="deals"/>Deals
              </div>
            </NavLink>
          </li>
          <li className={styles.rightItem}>
            <div>
              {this.renderUserAvatar()}
              <div className={styles.userInfo}>
                <span>{this.props.auth.userName}</span>
                <small>{this.props.auth.domainName}</small>
              </div>
            </div>
          </li>
          <li id="logout" onClick={() => this.props.logoutUser(this.props.history)} className={styles.item}>
            <div>
              Logout
            </div>
          </li>
        </ul>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export { Navbar };
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

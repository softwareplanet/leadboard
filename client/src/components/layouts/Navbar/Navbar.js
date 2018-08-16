import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import styles from './Navbar.css';
import {logoutUser} from "../../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const leadsRoute = "/home";




class Navbar extends Component {
  renderUserAvatar = () => {
      return this.props.user?
          <img className={styles.userImg} src={this.props.user.avatar} alt="user"/>:
          <span className={styles.userIcon + ' fa  fa-user-circle'}/>
  };

  render() {
    return (
      <header>
        <ul className={styles.menu} role="navigation">
          <li className={styles.logo}>Leadboard</li>
          <li className={styles.logoSmall}><h1>L</h1></li>

          <li className={this.props.location.pathname === leadsRoute ? styles.active : styles.itemWithLink}>
            <Link
              className={this.props.location.pathname === leadsRoute ? styles.currentLink : styles.link}
              to={leadsRoute}>
              <div>
                <span className={styles.icon + ' fa fa-check-circle'}/>Deals
              </div>
            </Link>
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
          <li onClick={() => this.props.logoutUser(this.props.history)} className={styles.item}>
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
  auth:state.auth
});

export { Navbar };
export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));

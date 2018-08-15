import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import styles from './Navbar.css';
import {logoutUser} from "../../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
// import profile from '../../../img/'




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
          <Link to={leadsRoute}>
            <li className={styles.logo}>Leadboard</li>
            <li className={styles.logoSmall}><h1>L</h1></li>
          </Link>
          <li>
            <form>
              <input className={styles.search} placeholder="Search"/>
            </form>
          </li>
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
                <span>Name</span>
                <small>Domain</small>
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
    logoutUser:PropTypes.func.isRequired
};

const leadsRoute = "/home";
export {Navbar};
export default connect(null, {logoutUser})(withRouter(Navbar));

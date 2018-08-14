import React, { Component } from "react";
import styles from './Navbar.css';
import {logoutUser} from "../../../actions/authActions";
import { connect } from "react-redux";




class Navbar extends Component {
  logoutHandler = () => this.props.logoutUser();


  render() {
    return (
      <header>
        <ul className={styles.menu} role="navigation">
          <li className={styles.logo}>Leadboard</li>
          <li>
            <form>
              <input className={styles.search} placeholder="Search" />
            </form>
          </li>
          <li className={styles.item}>
            <div>
              <span className={styles.icon + ' fa fa-check-circle'} />Deals
            </div>
          </li>
          <li className={styles.item}>
            <div>
              <span className={styles.icon + ' fa fa-address-card'} />Contacts
            </div>
          </li>
            <li onClick={this.logoutHandler} className={styles.rightItem}>
                <div>
                    <span className={styles.icon + ' fa  fa-user-circle'} />Logout
                </div>
            </li>
        </ul>
      </header>
    );
  }
}

export default connect(null, {logoutUser})(Navbar);

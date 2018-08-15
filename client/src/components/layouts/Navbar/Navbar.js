import React, { Component } from "react";
import styles from './Navbar.css';

class Navbar extends Component {
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
              <span className={styles.icon + ' fa fa-check-circle'} />Сделки
            </div>
          </li>
          <li className={styles.item}>
            <div>
              <span className={styles.icon + ' fa fa-address-card'} />Контакты
            </div>
          </li>
        </ul>
      </header>
    );
  }
}

export default Navbar;

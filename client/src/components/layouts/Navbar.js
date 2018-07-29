import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <header>
        <ul className="main-menu" role="navigation">
          <li className="logo">Leadboard</li>
          <li>
            <form>
              <input className="main-menu__search" placeholder="Search" />
            </form>
          </li>
          <li className="main-menu__item main-menu__item-active">
            <div>
              <span className="fa fa-check-circle main-menu__icon" />Сделки
            </div>
          </li>
          <li className="main-menu__item">
            <div>
              <span className="fa fa-address-card main-menu__icon" />Контакты
            </div>
          </li>
        </ul>
      </header>
    );
  }
}

export default Navbar;

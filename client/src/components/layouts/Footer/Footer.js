import React, { Component } from "react";
import styles from './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>Copyright &copy; {new Date().getFullYear()} Leadboard by Software Planet Group Ltd.</div>
    );
  }
}

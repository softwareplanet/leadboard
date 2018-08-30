import React, { Component } from 'react'
import styles from "./NotFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.notFound}>
         This item is not visible to you or does not exist. If you think you should be able to access this item, please contact an administrator.
      </div>
    )
  }
}

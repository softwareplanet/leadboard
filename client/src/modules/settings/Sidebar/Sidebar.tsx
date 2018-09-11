import * as React from 'react'
import * as styles from './Sidebar.css'

export default class Sidebar extends React.Component {

  public render() {
    return (
      <aside className={styles.sidebar}>'Aside'</aside>
    )
  }
}

import * as React from 'react'
import Sidebar from './Sidebar/Sidebar';
import * as styles from './Settings.css'

export default class Settings extends React.Component {

  public render() {
    return (
      <div className={styles.settings}>
        <Sidebar />
      </div>
    )
  }
}

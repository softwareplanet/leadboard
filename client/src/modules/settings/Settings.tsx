import * as React from 'react'
import * as styles from './Settings.css'
import Sidebar from './Sidebar/Sidebar';
import {  RouteComponentProps } from 'react-router';

export default class Settings extends React.Component<RouteComponentProps<{menuItem: string}>> {

  public render() {
    return (
      <div className={styles.settings}>
        <Sidebar history={this.props.history} param={this.props.match.params.menuItem}/>
      </div>
    )
  }
}

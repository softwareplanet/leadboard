import * as React from 'react';
import { Route } from 'react-router-dom';
import CustomizeFields from './CustomizeFields/CustomizeFields';
import Pipelines from './Pipelines/Pipelines';
import * as styles from './Settings.css';
import Sidebar from './Sidebar/Sidebar';

export default class Settings extends React.Component {

  public render() {
    return (
      <div className={styles.settings}>
        <Sidebar />
        <Route 
          path="/settings/pipelines" 
          component={Pipelines} 
        />
        <Route 
          path="/settings/customize-fields" 
          component={CustomizeFields} 
        />
      </div>
    )
  }
}

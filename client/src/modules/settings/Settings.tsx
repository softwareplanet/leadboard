import * as React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../layouts/Navbar/Navbar';
import CustomizeFields from './CustomizeFields/CustomizeFields';
import Funnels from './Funnels/Funnels';
import * as styles from './Settings.css';
import Sidebar from './Sidebar/Sidebar';


export default class Settings extends React.Component {

  public render() {
    return (
      <div>
        <Navbar />
        <div className={styles.settings}>
          <Sidebar />
          <div className={styles.settingsContent}>
            <Route
              path="/settings/funnels"
              component={Funnels}
            />
            <Route
              path="/settings/customize-fields"
              component={CustomizeFields}
            />
          </div>
        </div>
      </div>
    )
  }
}

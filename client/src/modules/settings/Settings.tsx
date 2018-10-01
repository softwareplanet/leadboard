import * as React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../layouts/Navbar/Navbar';
import CustomizeFields from './CustomizeFields/CustomizeFields';
import Funnels from './Funnels/Funnels';
import * as styles from './Settings.css';
import { CUSTOMIZE_FIELDS, IMPORT_SERVICE, PIPELINES } from './settingsRoutes';
import Sidebar from './Sidebar/Sidebar';
import ImportService from './ImportServicePage/ImportService';

export default class Settings extends React.Component {

  public render() {
    return (
      <div className={styles.settingsWrapper}>
        <Navbar />
        <div className={styles.settingsContent}>
          <Sidebar />
          <Route
            path={`/settings/${PIPELINES}`}
            component={Funnels}
          />
          <Route
            path={`/settings/${CUSTOMIZE_FIELDS}`}
            component={CustomizeFields}
          />
          <Route
            path={`/settings/${IMPORT_SERVICE}`}
            component={ImportService}
          />
        </div>

      </div>
    );
  }
}

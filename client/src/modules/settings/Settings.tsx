import * as React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../layouts/Navbar/Navbar';
import CustomizeFields from './CustomizeFields/CustomizeFields';
import Funnels from './Funnels/Funnels';
import ImportsPage from './ImportService/ImportServicePage/ImportsPage';
import PipeDriveImport from './ImportService/PipeDriveImport/PipeDriveImport';
import * as styles from './Settings.css';
import { CUSTOMIZE_FIELDS, IMPORT_PIPEDRIVE, IMPORTS_PAGE, PIPELINES } from './settingsRoutes';
import Sidebar from './Sidebar/Sidebar';

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
            path={`/settings/${IMPORTS_PAGE}`}
            component={ImportsPage}
          />
          <Route
            path={`/settings/${IMPORT_PIPEDRIVE}`}
            component={PipeDriveImport}
          />
        </div>
      </div>
    );
  }
}

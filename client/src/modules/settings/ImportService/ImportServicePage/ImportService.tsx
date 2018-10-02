import * as React from 'react';
import * as styles from './ImportService.css';
import pipeDriveLogo from '../../../../assets/img/import/pipeDrive-logo.png';
import { Link } from 'react-router-dom';
import { IMPORT_PIPEDRIVE } from '../../settingsRoutes';

export default class ImportService extends React.Component {

  public render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Import from other software</h1>
          <p>Select the source of the data import</p>
        </div>
        <div className={styles.sourceSelector}>
          <span className={styles.logo}><img src={pipeDriveLogo} alt="pipeDrive-logo" /></span>
          <span className={styles.title}>PipeDrive</span>
          <span>
            <Link
              key={'pipedrive import'}
              className={styles.button}
              to={`/settings/${IMPORT_PIPEDRIVE}`}
            >
              Import
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

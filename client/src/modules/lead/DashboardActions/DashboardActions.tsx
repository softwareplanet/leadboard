import * as React from 'react';
import AddLead from '../AddLead/AddLead';
import DashboardFilter from '../DashboardActions/DashboardFilter/DashboardFilter';
import * as styles from './DashboardActions.css';

class DashboardActions extends React.Component {
  public render() {
    return (
      <div className={styles.dashboardNavbar}>
        <AddLead />
        <DashboardFilter />
      </div>
    );
  }
}

export default DashboardActions;

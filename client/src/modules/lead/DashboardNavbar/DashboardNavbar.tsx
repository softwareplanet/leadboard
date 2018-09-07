import * as React from 'react';
import AddLead from '../AddLead/AddLead';
import DashboardFilter from '../DashboardNavbar/DashboardFilter/DashboardFilter';
import * as styles from './DashboardNavbar.css';

class DashboardNavbar extends React.Component {
  public render() {
    return (
      <div className={styles.dashboardNavbar}>
        <AddLead />
        <DashboardFilter />
      </div>
    );
  }
}

export default DashboardNavbar;

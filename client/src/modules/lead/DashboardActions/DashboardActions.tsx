import * as React from 'react';
import { connect } from 'react-redux';
import { loadDashboard, setActiveFunnel } from '../../lead/leadActions';
import AddLead from '../AddLead/AddLead';
import DashboardFilter from '../DashboardActions/DashboardFilter/DashboardFilter';
import * as styles from './DashboardActions.css';
import PipelineSwitcher from './PipelineSwitcher/PipelineSwitcher';

interface Props {
  dashboard: any;

  loadDashboard(funnelId: string, status: string): void;
  setActiveFunnel(funnelId: string): void;
}

class DashboardActions extends React.Component<Props, object> {
  public render() {
    const { dashboard} = this.props;
    return (
      <div className={styles.dashboardActions}>
        <AddLead dashboard={dashboard}/>
        <PipelineSwitcher funnels={dashboard.funnels} setActiveFunnel={this.props.setActiveFunnel}/>
        <DashboardFilter loadDashboard={loadDashboard}/>
      </div>
    );
  }
}

// export default DashboardActions;

const mapStateToProps = (state: any) => ({
  dashboard: state.dashboard,
});

export default connect(
  mapStateToProps,
  { loadDashboard, setActiveFunnel },
)(DashboardActions);

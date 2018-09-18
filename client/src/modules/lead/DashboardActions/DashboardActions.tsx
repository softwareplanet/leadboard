import * as React from 'react';
import { connect } from 'react-redux';
import { loadLeadboard } from '../../lead/leadActions';
import AddLead from '../AddLead/AddLead';
import DashboardFilter from '../DashboardActions/DashboardFilter/DashboardFilter';
import * as styles from './DashboardActions.css';
import PipelineSwitcher from './PipelineSwitcher/PipelineSwitcher';

interface Props {
  leads: any;

  loadLeadboard(status: string): void;
}

class DashboardActions extends React.Component<Props, object> {
  public render() {
    const {loadLeadboard, leads} = this.props;
    return (
      <div className={styles.dashboardActions}>
        <AddLead leads={this.props.leads}/>
        <PipelineSwitcher funnels={leads.funnels} loadLeadboard={loadLeadboard}/>
        <DashboardFilter leads={leads} loadLeadboard={loadLeadboard}/>
      </div>
    );
  }
}

// export default DashboardActions;

const mapStateToProps = (state: any) => ({
  leads: state.leads,
});

export default connect(
  mapStateToProps,
  { loadLeadboard },
)(DashboardActions);

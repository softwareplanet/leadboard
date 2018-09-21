import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import downArrowIcon from '../../../../assets/down-arrow.svg';
import filterIcon from '../../../../assets/filter-icon.svg';
import { IN_PROGRESS, LOST, WON } from '../../../../constants';
import Funnel from '../../../../models/Funnel';
import { loadDashboard, setFunnelsFilter, setActiveFilter } from '../../leadActions';
import * as styles from './DashboardFilter.css';
import DashboardFilterPopover from './DashboardFilterPopover/DashboardFilterPopover';

const filters = [
  { text: 'All open leads', type: IN_PROGRESS, showCheckMark: false },
  { text: 'All won leads', type: WON, showCheckMark: false },
  { text: 'All lost leads', type: LOST, showCheckMark: false },
];

interface State {
  isPopoverOpen: boolean;
  filters: any[];
}

interface Props extends RouteComponentProps<any> {
  activeFunnel: Funnel;
  dashboardFilters: any[];
  funnelsLength: number;

  loadDashboard(funnelId: string, status: string): void;

  setFunnelsFilter(filter: any): void;

  setActiveFilter(status: string): void;
}

class DashboardFilter extends React.Component<Props, State> {
  public state = {
    filters,
    isPopoverOpen: false,
  };

  public componentDidMount() {
    this.setState({
      filters: this.getFiltersWithShowedMark(IN_PROGRESS),
    });
  }

  public render() {
    return (
      <div>
        <button id="filter-button" className={styles.filterButton} onClick={this.togglePopover}>
          <span className={styles.iconSpan}><img src={filterIcon} alt="Filter icon" /></span>
          <span className={styles.filterSpan}>{this.getCurrentFilterText()}</span>
          <span className={styles.iconSpan}><img src={downArrowIcon} alt="Down arrow icon" /></span>
        </button>
        <DashboardFilterPopover
          isOpen={this.state.isPopoverOpen}
          toggle={this.togglePopover}
          onFilterClick={this.onFilterClick}
          filters={this.state.filters}
        />
      </div>
    );
  }

  private togglePopover = () => {
    this.setState(prevState => {
      return { isPopoverOpen: !prevState.isPopoverOpen };
    });
  }

  private getFiltersWithShowedMark = (status: string) => {
    return filters.map(filter => filter.type === status ? ({ ...filter, showCheckMark: true }) : filter);
  }

  private getCurrentFilterText = () => {
    if (this.areFunnelsWithFiltersLoaded()) {
      const dashboardFilter = this.props.dashboardFilters.find(filter => {
        console.log(filter.funnelId === localStorage.getItem('activeFunnelId'));
        // console.log(filter.funnelId);
        return filter.funnelId === localStorage.getItem('activeFunnelId')
       });
      console.log(dashboardFilter);
      const currentFilter = this.state.filters.find(filter =>
        dashboardFilter.status === filter.type,
      );
      return currentFilter ? currentFilter.text : this.state.filters[0].text;
    }
    
    return '';
  }

  private areFunnelsWithFiltersLoaded(): boolean {
    return this.props.funnelsLength !== 0 && 
      this.props.dashboardFilters.length === this.props.funnelsLength;
  }

  private onFilterClick = (status: string) => {
    this.setState({
      ...this.state,
      filters: this.getFiltersWithShowedMark(status),
    });
    this.props.setActiveFilter(status);

    this.props.setFunnelsFilter({
      funnelId: localStorage.getItem('activeFunnelId'),
      status,
    });
    status = this.props.dashboardFilters.find(filter => 
      localStorage.getItem('activeFunnelId') === filter.funnelId).status;
    this.props.loadDashboard(localStorage.getItem('activeFunnelId')!, status);
    this.togglePopover();
  }

}

const mapStateToProps = (state: any) => ({
  activeFunnel: state.dashboard.activeFunnel,
  dashboardFilters: state.dashboard.dashboardFilters,
  funnelsLength: state.dashboard.funnels.length,
});

export default connect(
  mapStateToProps,
  { loadDashboard, setFunnelsFilter, setActiveFilter },
)(withRouter(DashboardFilter));

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import downArrowIcon from '../../../../assets/down-arrow.svg';
import filterIcon from '../../../../assets/filter-icon.svg';
import { IN_PROGRESS, LOST, WON } from '../../../../constants';
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

  loadDashboard(funnelId: string, status: string): void;
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
    const currentFilter = this.state.filters.find(filter =>
      filter.showCheckMark === true,
    );
    return currentFilter ? currentFilter.text : this.state.filters[0].text;
  }

  private onFilterClick = (status: string) => {
    this.setState({
      ...this.state,
      filters: this.getFiltersWithShowedMark(status),
    });
    console.log(this.props.match.params.funnelId);
    this.props.loadDashboard(this.props.match.params.funnelId, status);
    this.togglePopover();
  }

}

export default withRouter(DashboardFilter);

// const mapStateToProps = (state: any) => ({
//   leads: state.leads,
// });

// export default connect(
//   mapStateToProps,
//   { loadLeadboard },
// )(DashboardFilter);

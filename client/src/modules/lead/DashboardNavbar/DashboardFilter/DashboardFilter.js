import React, { Component } from "react";
import styles from "./DashboardFilter.css";
import filterIcon from "../../../../assets/filter-icon.svg";
import downArrowIcon from "../../../../assets/down-arrow.svg";
import DashboardFilterPopover from "./DashboardFilterPopover/DashboardFilterPopover";
import { IN_PROGRESS, LOST, WON } from "../../../../constants";
import { loadLeadboard } from "../../leadActions";
import { connect } from "react-redux";

const filters = [
  { text: "Leads in progress", type: IN_PROGRESS, showCheckMark: false },
  { text: "All won leads", type: WON, showCheckMark: false },
  { text: "All lost leads", type: LOST, showCheckMark: false },
];

class DashboardFilter extends Component {
  state = {
    isPopoverOpen: false,
    filters,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      filters: this.getFiltersWithShowedMark(IN_PROGRESS),
    })
  }

  togglePopover = () => {
    this.setState(prevState => {
      return { isPopoverOpen: !prevState.isPopoverOpen };
    });
  };

  getFiltersWithShowedMark = (status) => {
    return filters.map(f => f.type === status ? ({ ...f, showCheckMark: true }) : f);
  };

  onFilterClick = (status) => {
    this.setState({
      ...this.state,
      filters: this.getFiltersWithShowedMark(status),
    });
    this.props.loadLeadboard(status);
    this.togglePopover();
  };

  render() {
    return (
      <div>
        <button id="filter-button" className={styles.filterButton} onClick={this.togglePopover}>
          <span className={styles.iconSpan}><img src={filterIcon} alt="Filter icon" /></span>
          <span className={styles.filterSpan}>Filter</span>
          <span className={styles.iconSpan}><img src={downArrowIcon} alt="Down arrow icon" /></span>
        </button>
        <DashboardFilterPopover
          isOpen={this.state.isPopoverOpen}
          target="filter-button"
          toggle={this.togglePopover}
          showCheckMark={this.state.filter}
          onFilterClick={this.onFilterClick}
          filters={this.state.filters}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leads,
});

export default connect(
  mapStateToProps,
  { loadLeadboard },
)(DashboardFilter);
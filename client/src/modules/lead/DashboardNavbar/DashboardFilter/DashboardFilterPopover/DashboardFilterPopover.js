import React, { Component } from "react";
import { Popover, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import styles from "./DashboardFilterPopover.css";
import filterIcon from "../../../../../assets/filter-icon.svg";

class DashboardFilterPopover extends Component {
  render() {
    return (
      <Popover
        className={styles.popover}
        placement="bottom-end"
        target="filter-button"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}>
        <Card>
          <CardHeader>
            <ul className={styles.filterTypesList}>
              <li className={styles.filterType}>
                <span className={styles.bigIcon}><img  className={styles.filterIcon} src={filterIcon} alt="Filter icon" /></span>
                <span>FILTERS</span>
              </li>
              <li className={styles.filterType}>
                <span className={styles.bigIcon}><img  className={styles.filterIcon} src={filterIcon} alt="Filter icon" /></span>
                <span>FILTERS</span>
              </li>
              <li className={styles.filterType}>
                <span className={styles.bigIcon}><img  className={styles.filterIcon} src={filterIcon} alt="Filter icon" /></span>
                <span>FILTERS</span>
              </li>
            </ul>
          </CardHeader>
          <CardBody className={styles.cardBody}>
            {
              this.props.filters.map(filter => (
                <div className={styles.filter} onClick={this.props.onFilterClick}>
                  <span className={styles.filterName}>{filter.text}</span>
                </div>
              ))
            }
          </CardBody>
          <CardFooter />
        </Card>
      </Popover>
    );
  }
}

export default DashboardFilterPopover;
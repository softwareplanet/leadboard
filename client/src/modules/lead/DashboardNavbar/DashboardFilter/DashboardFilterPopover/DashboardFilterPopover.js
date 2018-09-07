import React, { Component } from "react";
import { Popover, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import styles from "./DashboardFilterPopover.css";
import filterIcon from "../../../../../assets/filter-icon.svg";
import checkMarkIcon from "../../../../../assets/checkMark.svg";
import ReactSVG from "react-svg";

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
                <span className={styles.bigIcon}>
                  <ReactSVG src={filterIcon} className={styles.filterIcon} />
                </span>
                <span>FILTERS</span>
              </li>
            </ul>
          </CardHeader>
          <CardBody className={styles.cardBody}>
            {
              this.props.filters.map(filter => (
                <div key={filter.type} className={styles.filter} onClick={() => this.props.onFilterClick(filter.type)}>
                  <span className={styles.filterName}>{filter.text}</span>
                  {
                    filter.showCheckMark ? (
                      <span className={styles.iconSpan}>
                        <ReactSVG src={checkMarkIcon} className={styles.checkMarkIcon} />
                      </span>
                    ) : null
                  }
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
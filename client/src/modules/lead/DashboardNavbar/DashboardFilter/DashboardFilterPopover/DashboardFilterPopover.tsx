import * as React from 'react';
import ReactSVG from 'react-svg';
import { Card, CardBody, CardFooter, CardHeader, Popover } from 'reactstrap';
import checkMarkIcon from '../../../../../assets/checkMark.svg';
import filterIcon from '../../../../../assets/filter-icon.svg';
import * as styles from './DashboardFilterPopover.css';

interface Props {
  isOpen: boolean,
  filters: any[]

  toggle(): void,

  onFilterClick(type: string): void,
}

class DashboardFilterPopover extends React.Component<Props, object> {
  public render() {
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
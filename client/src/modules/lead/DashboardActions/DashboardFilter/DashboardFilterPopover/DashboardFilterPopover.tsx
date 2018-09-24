import * as classNames from 'classnames';
import * as React from 'react';
import ReactSVG from 'react-svg';
import { Card, CardBody, CardHeader, Popover } from 'reactstrap';
import checkMarkIcon from '../../../../../assets/img/checkMark.svg';
import filterIcon from '../../../../../assets/img/filter-icon.svg';
import * as styles from './DashboardFilterPopover.css';

interface Props {
  isOpen: boolean;
  filters: any[];

  toggle(): void;

  onFilterClick(type: string): void;
}

class DashboardFilterPopover extends React.Component<Props, object> {
  public render() {
    return (
      <Popover
        className={styles.popover}
        placement="bottom-end"
        target="filter-button"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        >
        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
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
                <div key={filter.type} className={styles.filter} onClick={this.props.onFilterClick.bind(this, filter.type)}>
                  <span
                    className={classNames(styles.filterName, { [styles.currentFilter]: filter.showCheckMark })}
                  >
                    {filter.text}
                  </span>
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
        </Card>
      </Popover>
    );
  }
}

export default DashboardFilterPopover;

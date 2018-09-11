import { createStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import ReactSVG from 'react-svg';
import leadIcon from '../../../../assets/lead-icon.svg';
import searchIcon from '../../../../assets/search-icon.svg';
import * as styles from './Search.css';

const tabsStyles = createStyles({
  root: {
    height: 40,
    width: 48,
  },
});

class Search extends React.Component {
  public state = {
    tabValue: 0,
  };

  public render() {
    return (
      <div>
        <div className={styles.searchWrapper}>
          <ReactSVG className={styles.searchIcon} src={searchIcon} />
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
        <div className={styles.suggestionsList}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
          >
            <Tab label="All" />
            <Tab icon={<ReactSVG className={styles.leadTypeIcon} src={leadIcon} />} />
          </Tabs>
          <div>
            <ul className={styles.searchResult}>
              <li className={styles.noResults}>No results for 'qwd'</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  private handleChange = (e: any, tabValue: number) => {
    this.setState({ tabValue });
  };
}

export default withStyles(tabsStyles)(Search);

/*
 <ul className={styles.suggestionsTypes}>
            <li><a href="#">All</a></li>
            <li><ReactSVG src={leadIcon} className={styles.leadTypeIcon} /></li>
          </ul>
*/
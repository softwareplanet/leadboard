import * as React from 'react';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/search-icon.svg';
import * as styles from './Search.css';

class Search extends React.Component {
  public render() {
    return (
      <div className={styles.searchWrapper}>
        <span><ReactSVG className={styles.searchIcon} src={searchIcon} /></span>
        <input type="text" className={styles.searchInput} placeholder="Search" />
      </div>
    );
  }
}

export default Search;
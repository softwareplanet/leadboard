import {
  DataSearch,
  ReactiveBase,
} from '@appbaseio/reactivesearch';
import * as React from 'react';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/search-icon.svg';
import * as styles from './Search.css';

class Search extends React.Component {
  public render() {
    return (
      <div className={styles.searchWrapper}>
        <ReactiveBase
          app="good-books-ds"
          credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        >
          <ReactSVG className={styles.searchIcon} src={searchIcon} />
          <DataSearch
            componentId={'search'}
            placeholder={'Search'}
            dataField={['original_title', 'original_title.search']}
            debounce={100}
            showIcon={false}
            className={styles.search}
            innerClass={{ input: styles.searchInput }}
          />
        </ReactiveBase>
      </div>
    );
  }
}

export default Search;
import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/search-icon.svg';
import isBlank from '../../../../utils/isBlank';
import { loadSearchResult } from '../searchActions';
import * as styles from './Search.css';
import SearchSpinner from './Spinner/SearchSpinner';
import SearchInput from './SearchInput/SearchInput';

interface Props {
  search: any;
  loadSearchResult(query: string): void;
}

class Search extends React.Component<Props, object> {
  public state = {
    isDropdownOpen: false,
    value: '',
  };

  public render() {
    const state = this.state;
    return (
      <div
        className={state.isDropdownOpen && state.value.length > 1 ? styles.highlightedSearchWrapper : styles.searchWrapper}>
        {this.props.search.loading?
          <SearchSpinner className={styles.searchSpinner}/>
          : <ReactSVG className={styles.searchIcon} src={searchIcon} />}
        <SearchInput
          items={this.props.search.result}
          open={state.isDropdownOpen}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onSelect={this.onSelect}
          value={state.value}
        />
      </div>
    );
  }

  private onSelect = (value: string, item: any) => {
    window.location.replace(`../lead/${item._id}`);
  };

  private onFocus = () => {
    this.setState({
      isDropdownOpen: !isBlank(this.state.value),
    });
  };

  private onBlur = () => {
    this.setState({
      isDropdownOpen: false,
    });
  };

  private onChange = (event: any) => {
    const { value } = event.target;
    if (value.length > 1) {
      this.props.loadSearchResult(value);
    }
    this.setState({
      isDropdownOpen: !isBlank(value),
      value,
    });
  };
}

const mapStateToProps = (state: any) => ({
  search: state.search,
});

export default connect(mapStateToProps, { loadSearchResult })(Search);

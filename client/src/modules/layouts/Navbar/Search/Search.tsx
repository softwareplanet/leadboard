import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/img/search-icon.svg';
import SearchItemModel from '../../../../models/search/SearchItem';
import isBlank from '../../../../utils/isBlank';
import { loadSearchResult } from '../searchActions';
import * as styles from './Search.css';
import SearchInput from './SearchInput/SearchInput';
import SearchSpinner from './Spinner/SearchSpinner';

interface Props {
  history: any;
  search: any;

  loadSearchResult(query: string): void;
}

interface State {
  isDropdownOpen: boolean;
  value: string;
}

class Search extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
    value: '',
  };

  public render() {
    const state = this.state;
    return (
      <div
        className={state.isDropdownOpen && state.value.length > 1 ? styles.highlightedSearchWrapper : styles.searchWrapper}>
        {this.props.search.loading ?
          <SearchSpinner className={styles.searchSpinner} />
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

  private onSelect = (value: string, item: SearchItemModel) => {
    this.props.history.push(`../lead/${item._id}`);
    this.setState({ isDropdownOpen: false, value: '' });
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

  private onChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
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

export { Search };

export default connect(mapStateToProps, { loadSearchResult })(Search);

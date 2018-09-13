import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/search-icon.svg';
import isBlank from '../../../../utils/isBlank';
import { loadSearchResult } from '../searchActions';
import * as styles from './Search.css';
import SearchInput from './SearchInput';
import SearchSpinner from './Spinner/SearchSpinner';

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
    return (
      <div className={this.state.isDropdownOpen ? styles.highlightedSearchWrapper : styles.searchWrapper}>
        {this.props.search.loading?
          <SearchSpinner className={styles.searchSpinner}/>
          : <ReactSVG className={styles.searchIcon} src={searchIcon} />}
        <SearchInput
          items={this.props.search.result}
          open={this.state.isDropdownOpen}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onSelect={this.onSelect}
          value={this.state.value}
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
    this.props.loadSearchResult(value);
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

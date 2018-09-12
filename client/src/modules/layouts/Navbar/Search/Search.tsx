import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import searchIcon from '../../../../assets/search-icon.svg';
import isBlank from '../../../../utils/isBlank';
import { loadSearchResult } from '../searchActions';
import * as styles from './Search.css';
import SearchInput from './SearchInput';

interface Props {
  search: any;

  loadSearchResult(part: string): void;
}

class Search extends React.Component<Props, object> {
  public state = {
    isDropdownOpen: false,
    tabValue: 0,
    value: '',
  };

  public render() {
    return (
      <div className={this.state.isDropdownOpen ? styles.highlightedSearchWrapper : styles.searchWrapper}>
        <ReactSVG className={styles.searchIcon} src={searchIcon} />
        <SearchInput
          items={[{ _id: '1', name: 'Bob lead lead' }, { _id: '2', name: 'Bobik leadik leadik' }]}
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

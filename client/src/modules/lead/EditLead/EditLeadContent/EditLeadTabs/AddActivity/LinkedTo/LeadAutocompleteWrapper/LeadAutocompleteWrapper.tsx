import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import clearIcon from '../../../../../../../../assets/img/clear.svg';
import dealIcon from '../../../../../../../../assets/img/deals-icon.svg';
import SearchItemModel from '../../../../../../../../models/search/SearchItem';
import isBlank from '../../../../../../../../utils/isBlank';
import LeadAutocomplete from '../../../../../../../common/autocomplete/lead/LeadAutoComplete';
import SearchSpinner from '../../../../../../../layouts/Navbar/Search/Spinner/SearchSpinner';
// import { loadSearchResult } from '../searchActions';
import * as styles from './LeadAutocompleteWrapper.css';
import { autocompleteStyles } from '../../../../../../../common/autocomplete/styles/autocomplete-styles';


interface Props {

  // loadSearchResult(query: string): void;
}

interface State {
  isDropdownOpen: boolean;
  leads?: any;
  loading: boolean;
  value: string;
}

class LeadAutocompleteWrapper extends React.Component<Props, State> {
  public state: State = {
    isDropdownOpen: false,
    loading: false,
    value: '',
  };

  public render() {
    const state = this.state;
    const autocompleteProps = {
      inputStyle: autocompleteStyles.addLeadInput,
      itemsCount: 5,
      onFocus: this.onAutocompleteFocus,
    };
    const testLeads = [ {
      "_id": "5bab2ba3baf6781b6349053f",
      "name": "Bob lead",
      "status": "InProgress",
      "contact": "Bob",
      "stage": "Stage 1",
      "type": "Lead"
  },
  {
      "_id": "5bab2ba9baf6781b63490541",
      "name": "Boss lead",
      "status": "InProgress",
      "contact": "Boss",
      "stage": "Stage 2",
      "type": "Lead"
  },
  {
      "_id": "5bab2bb0baf6781b63490543",
      "name": "Boar lead",
      "status": "InProgress",
      "contact": "Boar",
      "stage": "Stage 1",
      "type": "Lead"
  },] 
    return (
      <div className={styles.leadAutocomplete}>
      <ReactSVG className={styles.dealIcon} src={dealIcon} />
        <LeadAutocomplete
          // items={this.state.leads.result}
          items={testLeads}
          open={state.isDropdownOpen}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onSelect={this.onSelect}
          value={state.value}
          styles={autocompleteStyles.organization}
        />
        {this.state.loading ?
          <SearchSpinner className={styles.leadSpinner} />
          : <ReactSVG className={styles.clearIcon} src={clearIcon} />}
      </div>
    );
  }

  private onSelect = (item: SearchItemModel) => {
    // this.props.history.push(`../lead/${item._id}`);
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
      value: '',
    });
  }

  private onChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    if (value.length > 1) {
      // this.props.loadSearchResult(value);
    }
    this.setState({
      isDropdownOpen: !isBlank(value),
      value,
    });
  }
  
  private onAutocompleteFocus = (event: any) => {
    event.target.parentNode.parentNode.setAttribute("style", "border: 1px solid #317ae2");
  }
}

const mapStateToProps = (state: any) => ({
  search: state.search,
});

export { LeadAutocompleteWrapper };

export default connect(mapStateToProps,null )(LeadAutocompleteWrapper);
// { loadSearchResult }
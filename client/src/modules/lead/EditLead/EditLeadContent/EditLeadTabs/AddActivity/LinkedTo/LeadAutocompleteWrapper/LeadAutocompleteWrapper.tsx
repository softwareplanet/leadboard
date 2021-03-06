import * as React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import clearIcon from '../../../../../../../../assets/img/clear.svg';
import dealIcon from '../../../../../../../../assets/img/deals-icon.svg';
import Lead from '../../../../../../../../models/Lead';
import SearchItemModel from '../../../../../../../../models/search/SearchItem';
import isBlank from '../../../../../../../../utils/isBlank';
import LeadAutoComplete from '../../../../../../../common/autocomplete/lead/LeadAutoComplete';
import { autocompleteStyles } from '../../../../../../../common/autocomplete/styles/autocomplete-styles';
import SearchSpinner from '../../../../../../../layouts/Navbar/Search/Spinner/SearchSpinner';
import { loadSearchResult } from '../../../../../../../layouts/Navbar/searchActions';
import * as styles from './LeadAutocompleteWrapper.css';
import { PopulatedLeadActivity } from '../../../../../../../../models/Activity';

interface Props {
  lead?: Lead;
  activity?: PopulatedLeadActivity;
  leads?: SearchItemModel[];
  loading: boolean;

  loadSearchResult(query: string): void;

  setLead(leadId?: string): void;
}

interface State {
  isDropdownOpen: boolean;
  selectedLead?: any;
  value: string;
}

class LeadAutocompleteWrapper extends React.Component<Props, State> {
  public leadAutocomplete = React.createRef<LeadAutoComplete>();
  public leadAutocompleteWrapperRef = React.createRef<HTMLDivElement>();

  public state: State = {
    isDropdownOpen: false,
    selectedLead: this.props.lead,
    value: this.props.activity ? this.props.activity.lead.name : '',
  };

  public clear = () => {
    this.setState({
      value: '',
    });
    this.leadAutocomplete.current!.inputFocus();
    this.leadAutocomplete.current!.input.current!.focus();
  }

  public componentDidMount() {
    if (window.location.href.includes('contact') || window.location.href.includes('organization')){
      return;
    }
    this.onSelect(this.props.activity ? this.props.activity.lead.name : this.props.lead!.name, this.props.lead);
  }

  public render() {
    const state = this.state;
    const autocompleteProps = {
      inputStyle: { ...autocompleteStyles.addLeadInput, width: '450px', marginLeft: '0' },
      itemsCount: 5,
      onFocus: this.onAutocompleteFocus,
    };

    return (
      <div ref={this.leadAutocompleteWrapperRef} className={styles.leadAutocomplete}>
        <ReactSVG className={styles.dealIcon} src={dealIcon} />
        <LeadAutoComplete
          {...autocompleteProps}
          items={this.props.leads}
          open={state.isDropdownOpen}
          onBlur={this.onBlur}
          loading={this.props.loading}
          onChange={this.onChange}
          onSelect={this.onSelect}
          value={state.value ? state.value : ''}
          ref={this.leadAutocomplete}
          styles={autocompleteStyles.lead}
        />
        {this.props.loading ?
          <SearchSpinner className={styles.leadSpinner} /> :
          <ReactSVG
            className={styles.clearIcon}
            onClick={this.clear}
            src={clearIcon}
          />
        }
      </div>
    );
  }

  private onSelect = (value: string, item?: any) => {
    this.props.setLead(item._id);
    this.setState({ value, selectedLead: item, isDropdownOpen: false },
      () => this.leadAutocomplete.current!.inputBlur());
    this.leadAutocompleteWrapperRef.current!.removeAttribute('style');
  }

  private onBlur = (e: React.SyntheticEvent) => {
    this.leadAutocompleteWrapperRef.current!.removeAttribute('style');
    this.setState({
      ...this.state,
      isDropdownOpen: false,
      value: this.state.selectedLead.name === this.state.value ? this.state.value : '',
    });
    if (this.state.selectedLead.name !== this.state.value) {
      this.setState({ selectedLead: {} });
      this.props.setLead();
    }
  }

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
  }

  private onAutocompleteFocus = (event: any) => {
    this.leadAutocompleteWrapperRef.current!.setAttribute('style', 'border: 1px solid #317ae2');
  }
}


const mapStateToProps = (state: any) => ({
  lead: state.dashboard.editLead.lead,
  leads: state.search.result,
  loading: state.search.loading,
});

export { LeadAutocompleteWrapper };

export default connect(mapStateToProps, { loadSearchResult })(LeadAutocompleteWrapper);

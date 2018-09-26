import { trim } from 'lodash';
import * as React from 'react';
import * as ReactAutocomplete from 'react-autocomplete';
import SearchItemModel from '../../../../models/search/SearchItem';
// import ReactSVG from 'react-svg';
// import SearchSpinner from '../../../layouts/Navbar/Search/Spinner/SearchSpinner';
// import { clearIcon } from '../../../lead/EditLead/EditLeadContent/EditLeadTabs/AddActivity/LinkedTo/LeadAutocompleteWrapper/LeadAutocompleteWrapper.css';

interface Props {
  styles?: any;
  value: any;
  open: any;
  items?: any;
  itemsCount?: any;
  inputStyle?: any;

  onFocus: any;
  onBlur: any;
  onChange: any;
  onClear: any;
  loading: boolean;

  onSelect(text: string, item: SearchItemModel): void;
}

class LeadAutocomplete extends React.Component<Props> {
  public input = React.createRef<HTMLInputElement>();

  public render() {
    const styles = this.props.styles;
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 &&
          this.props.open}
        items={this.props.items}
        shouldItemRender={(item: any, value: any) => item.name.toLowerCase().indexOf(trim(value).toLowerCase()) > -1}
        getItemValue={(item: any) => item.name}
        renderMenu={(items: any) =>
          <div className="leadsList" style={styles.menu} children={items.splice(0, this.props.itemsCount)} />
        }
        renderItem={(item: any, highlighted: any) =>
          <span
            key={item._id}
            onClick={(this.props.onSelect.bind(this, item))}
            style={{
              ...styles.menuItem,
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2"
            }}
          >{item.name}</span>
        }
        inputProps={{
          placeholder: 'Lead',
          className: 'lead-input',
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          style: this.props.inputStyle,
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
        ref={this.input}
      />
    );
  }

  // private clearValue = () => {
  //   this.props.onClear();
  //   this.inputFocus();
  // }
  // private inputFocus = () => {
  //   this.input!.current!.focus();
  // }

  // private inputBlur = () => {
  //   this.input!.current!.blur();
  // }
}

export default LeadAutocomplete;

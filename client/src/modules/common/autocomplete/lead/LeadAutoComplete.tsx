import { trim } from 'lodash';
import * as React from 'react';
import * as ReactAutocomplete from 'react-autocomplete';
import { autocompleteStyles } from '../styles/autocomplete-styles';

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
  onSelect: any;
}

class LeadAutocomplete extends React.Component<Props> {
  public input? = React.createRef<HTMLInputElement>();

  public render() {
    const autocompleteProps = {
      inputStyle: autocompleteStyles.addLeadInput,
      itemsCount: 5,
      onFocus: this.onAutocompleteFocus,
    };
    
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 && this.props.open}
        items={this.props.items}
        shouldItemRender={(item: any, value: any) => item.name.toLowerCase().indexOf(trim(value).toLowerCase()) > -1}
        getItemValue={(item: any) => item.name}
        renderMenu={(items: any) =>
          <div className="leadsList" style={autocompleteStyles.menu} children={items.splice(0, autocompleteProps.itemsCount)} />
        }
        renderItem={(item: any, highlighted: any) =>
          <span
            key={item._id}
            style={{
              ...autocompleteStyles.menuItem,
              backgroundColor: highlighted ? "#317ae2" : "transparent",
              color: highlighted ? "#fff" : "#317ae2"
            }}
          />
        }
        inputProps={{
          className: 'lead-input',
          onBlur: this.props.onBlur,
          onFocus: autocompleteProps.onFocus,
          style: autocompleteProps.inputStyle,
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
        ref={this.input}
      />
    );
  }

  // private inputFocus = () => {
  //   this.input!.current!.focus();
  // }

  // private inputBlur = () => {
  //   this.input!.current!.blur();
  // }
  private onAutocompleteFocus = (event: any) => {
    event.target.parentNode.parentNode.setAttribute("style", "border: 1px solid #317ae2");
  };
}

export default LeadAutocomplete;

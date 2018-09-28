import { trim } from 'lodash';
import * as React from 'react';
import * as ReactAutocomplete from 'react-autocomplete';
import SearchItemModel from '../../../../models/search/SearchItem';

interface Props {
  styles?: any;
  value: string;
  open: boolean;
  items?: any;
  itemsCount?: number;
  inputStyle?: any;
  loading: boolean;

  onFocus(event: React.SyntheticEvent): void;
  
  onBlur(event: React.SyntheticEvent): void;

  onChange(event: React.SyntheticEvent): void;

  onSelect(text: string, item: SearchItemModel): void;
}

class LeadAutocomplete extends React.Component<Props> {
  public input = React.createRef<HTMLInputElement>();

  public inputFocus = () => {
    this.input.current!.focus();
  }

  public inputBlur = () => {
    this.input.current!.blur();
  }

  public render() {    
    const styles = this.props.styles;
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 &&
          this.props.open && this.props.items.length > 0}
        items={this.props.items}
        wrapperStyle={{display: 'inline-block', position: 'relative'}}
        shouldItemRender={(item: any, value: any) => item.name.toLowerCase().indexOf(trim(value).toLowerCase()) > -1}
        getItemValue={(item: any) => item.name}
        renderMenu={(items: any) =>
          <div
            className="leadsList"
            style={styles.menu}
            children={items.splice(0, this.props.itemsCount)}
          />
        }
        renderItem={(item: any, highlighted: any) =>
          <span
            key={item._id}
            onClick={(this.props.onSelect.bind(this, item))}
            style={{
              ...styles.menuItem,
              backgroundColor: highlighted ? '#317ae2' : 'transparent',
              color: highlighted ? '#fff' : '#317ae2',
            }}
          >
            {item.name}
          </span>
        }
        inputProps={{
          className: 'lead-input',
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          placeholder: 'Lead',
          style: this.props.inputStyle,
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
        ref={this.input}
      />
    );
  }
}

export default LeadAutocomplete;

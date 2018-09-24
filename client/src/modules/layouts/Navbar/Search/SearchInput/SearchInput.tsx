import { trim } from 'lodash';
import * as React from 'react';
import * as ReactAutocomplete from 'react-autocomplete';
import Highlighter from 'react-highlight-words';
import ReactSVG from 'react-svg';
import leadIcon from '../../../../../assets/img/lead-icon.svg';
import SearchItemModel from '../../../../../models/search/SearchItem';
import isBlank from '../../../../../utils/isBlank';
import * as styles from '../Search.css';
import SearchTabs from './SearchTabs';

interface Props {
  items: [];
  open: boolean;
  value: string;

  onBlur(): void;

  onChange(event: any): void;

  onFocus(): void;

  onSelect(value: string, item: any): void;
}

interface State {
  tabValue: string;
}

const ALL = 'All';

class SearchInput extends React.Component<Props, State> {
  public state: State = {
    tabValue: ALL,
  };

  public render() {
    return (
      <ReactAutocomplete
        open={trim(this.props.value).length > 1 && this.props.open}
        items={this.renderItemsByType()}
        getItemValue={(item: SearchItemModel) => item.name}
        renderMenu={this.renderMenu}
        renderItem={this.renderItem}
        inputProps={{
          className: styles.searchInput,
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          placeholder: 'Search',
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
        autoHighlight={false}
      />
    );
  }

  private renderMenu = (items: []) => {
    return (
      items.length !== 0 ? (
        <div className={styles.suggestionsList}>
          <SearchTabs value={this.state.tabValue} onChange={this.handleChange} />
          <ul className={styles.searchResult} children={items} />
        </div>
      ) : (
        <div className={styles.suggestionsList}>
          <SearchTabs value={this.state.tabValue} onChange={this.handleChange} />
          <ul>
            <li className={styles.noResults}>No results for "{this.props.value}"</li>
          </ul>
        </div>
      )
    );
  };

  private renderItem = (item: SearchItemModel, highlighted: boolean) => {
    return (
      <li className={highlighted ? styles.highlightedSuggestion : styles.suggestion}
          key={item._id}>
        <ReactSVG src={leadIcon} className={styles.leadIcon} />
        <div className={styles.suggestionInfo}>
          <Highlighter
            highlightClassName={highlighted ? styles.highlightedWrapperName : styles.highlightName}
            unhighlightClassName={styles.withoutHighlightName}
            searchWords={this.props.value.split(' ')}
            autoEscape={true}
            textToHighlight={item.name}
          />
          {this.renderItemInfo(item, highlighted)}
        </div>
        {this.renderItemStatus(item.status ? item.status : '')}
      </li>
    );
  };

  private renderItemInfo = (item: SearchItemModel, highlighted: boolean) => {
    return (
      <small>
        <Highlighter
          highlightClassName={highlighted ? styles.highlightedWrapperInfo : styles.highlightInfo}
          unhighlightClassName={styles.withoutHighlightInfo}
          searchWords={this.props.value.split(' ')}
          autoEscape={true}
          textToHighlight={this.createLeadSuggestionInfo(item)}
        />
      </small>
    );
  };

  private createLeadSuggestionInfo = (item: SearchItemModel) => {
    let info = '';
    if (item.contact && !isBlank(item.contact)) {
      info = `${item.contact}`;
    }

    if (item.organization && !isBlank(item.organization)) {
      info += isBlank(info) ? `${item.organization}` : `, ${item.organization}`;
    }

    if (item.stage && !isBlank(item.stage)) {
      info += `, ${item.stage}`;
    }

    return info;
  };

  private renderItemStatus = (status: string) => {
    switch (status) {
      case 'InProgress':
        return null;
      case 'Won':
        return <span className={styles.itemWonBadge}>{status.toLowerCase()}</span>;
      case 'Lost':
        return <span className={styles.itemLostBadge}>{status.toLowerCase()}</span>;
      default:
        return null;
    }
  };

  private handleChange = (event: React.SyntheticEvent, tabValue: string) => {
    this.setState({ tabValue });
  };

  private renderItemsByType = () => {
    const items = this.props.items;
    const tabValue = this.state.tabValue;
    return tabValue === ALL ? items : items.filter((item: SearchItemModel) => item.type === tabValue);
  };
}

export default SearchInput;

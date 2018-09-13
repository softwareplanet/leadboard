import React from "react";
import ReactAutocomplete from "react-autocomplete";
import leadIcon from "../../../../../assets/lead-icon.svg";
import ReactSVG from "react-svg";
import { trim } from "lodash";
import * as styles from "../Search.css";
import SearchTabs from "./SearchTabs";
import Highlighter from "react-highlight-words";

const ALL = "All";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: ALL,
    };
  }

  renderItemInfo = (item) => {
    return (
      <small>
        <Highlighter
          highlightClassName={styles.highlightInfo}
          unhighlightClassName={styles.withoutHighlightInfo}
          searchWords={this.props.value.split(" ")}
          autoEscape={true}
          textToHighlight={this.createLeadSuggestionInfo(item)}
        />
      </small>
    );
  };

  createLeadSuggestionInfo = (item) => {
    let info = "";
    if (item.organization && item.organization.length) {
      if (item.contact && item.contact.length) {
        info = `${item.organization}, ${item.contact}`;
      } else {
        info = item.organization;
      }
    } else {
      if (item.contact && item.contact.length) {
        info = item.contact;
      } else {
        info = null;
      }
    }
    return info;
  };

  renderItemStatus = (status) => {
    switch (status) {
      case "InProgress":
        return null;
      case "Won":
        return <span className={styles.itemWonBadge}>{status.toLowerCase()}</span>;
      case "Lost":
        return <span className={styles.itemLostBadge}>{status.toLowerCase()}</span>;
      default:
        return null;
    }
  };

  handleChange = (e, tabValue) => {
    this.setState({ tabValue });
  };

  renderItemsByType = () => {
    let items = this.props.items;
    let tabValue = this.state.tabValue;
    return tabValue === ALL ? items : items.filter(item => item.type === tabValue);
  };

  render() {
    return (
      <ReactAutocomplete
        open={this.props.value.length > 1 && trim(this.props.value).length > 0 && this.props.open}
        items={this.renderItemsByType()}
        getItemValue={item => item.name}
        renderMenu={(items) =>
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
        }
        renderItem={(item, highlighted) => {
          return (
            <li className={highlighted ? styles.highlightedSuggestion : styles.suggestion}
                key={item._id}>
              <ReactSVG src={leadIcon} className={styles.leadIcon} />
              <div className={styles.suggestionInfo}>
                <Highlighter
                  highlightClassName={styles.highlightName}
                  unhighlightClassName={styles.withoutHighlightName}
                  searchWords={this.props.value.split(" ")}
                  autoEscape={true}
                  textToHighlight={item.name}
                />
                {this.renderItemInfo(item)}
              </div>
              {this.renderItemStatus(item.status)}
            </li>
          );
        }}
        inputProps={{
          className: styles.searchInput,
          placeholder: "Search",
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
        }}
        value={this.props.value}
        onChange={this.props.onChange}
        onSelect={this.props.onSelect}
      />
    );
  }
}

export default SearchInput;
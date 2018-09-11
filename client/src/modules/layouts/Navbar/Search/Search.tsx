import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';
import leadIcon from '../../../../assets/lead-icon.svg';
import searchIcon from '../../../../assets/search-icon.svg';
import * as styles from './Search.css';

const leads: any = [];

class Search extends React.Component {
  public state = {
    tabValue: 0,
  };

  public render() {
    return (
      <div>
        <div className={styles.searchWrapper}>
          <ReactSVG className={styles.searchIcon} src={searchIcon} />
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
        <div className={styles.suggestionsList}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
          >
            <Tab label="All" />
            <Tab icon={<ReactSVG className={styles.leadTypeIcon} src={leadIcon} />} />
          </Tabs>
          <ul className={styles.searchResult}>
            {
              leads.length ? (
                leads.map((lead: any) => {
                  return (
                    <Link to={`/${lead._id}`} className={styles.suggestion} key={lead._id}>
                      <ReactSVG src={leadIcon} className={styles.leadIcon} />
                      <div className={styles.suggestionInfo}>
                        <strong>{lead.name}</strong>
                        {
                          this.createLeadSuggestionInfo(lead).length ?
                            <small>{this.createLeadSuggestionInfo(lead)}</small> : null
                        }
                      </div>
                    </Link>
                  );
                })
              ) : (
                <li className={styles.noResults}>No results for 'qwd'</li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }

  private handleChange = (e: any, tabValue: number) => {
    this.setState({ tabValue });
  };

  private createLeadSuggestionInfo = (lead: any) => {
    let info = '';
    if (lead.organization.length) {
      if (lead.contact.length) {
        info = `${lead.organization}, ${lead.contact}`;
      } else {
        info = `${lead.organization}`;
      }
    } else {
      if (lead.contact.length) {
        info = `${lead.contact}`;
      } else {
        info = '';
      }
    }
    return info;
  };
}

export default Search;

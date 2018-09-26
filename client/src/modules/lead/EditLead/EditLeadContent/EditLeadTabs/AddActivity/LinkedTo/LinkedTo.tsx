import * as React from 'react';
import { LeadAutocompleteWrapper } from './LeadAutocompleteWrapper/LeadAutocompleteWrapper';
import * as styles from './LinkedTo.css';

export default class Search extends React.Component{

  public render() {
    return (
      <div className={styles.linkedTo}>
        <span className={styles.linkedToLabel}>Linked to</span>
        <LeadAutocompleteWrapper />
      </div>
    );
  }
}
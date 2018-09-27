import * as React from 'react';
import LeadAutocompleteWrapper from './LeadAutocompleteWrapper/LeadAutocompleteWrapper';
import * as styles from './LinkedTo.css';

interface Props {

  setLead(leadId: string): void;
}

export default class LinkedTo extends React.Component<Props>{

  public render() {
    return (
      <div className={styles.linkedTo}>
        <span className={styles.linkedToLabel}>Linked to</span>
        <LeadAutocompleteWrapper setLead={this.props.setLead}/>
      </div>
    );
  }
}

import * as React from 'react';
import LeadAutocompleteWrapper from './LeadAutocompleteWrapper/LeadAutocompleteWrapper';
import * as styles from './LinkedTo.css';
import { PopulatedLeadActivity } from '../../../../../../../models/Activity';

interface Props {
  activity?: PopulatedLeadActivity;

  setLead(leadId?: string): void;
}

export default class LinkedTo extends React.Component<Props>{

  public render() {
    return (
      <div className={styles.linkedTo}>
        <span className={styles.linkedToLabel}>Linked to</span>
        <LeadAutocompleteWrapper activity={this.props.activity} setLead={this.props.setLead} />
      </div>
    );
  }
}

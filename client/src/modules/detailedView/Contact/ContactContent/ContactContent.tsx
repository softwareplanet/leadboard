import * as React from 'react';
import { ContactTabs } from '../../../lead/EditLead/EditLeadContent/EditLeadTabs/EditLeadTabs';
import * as detailedViewStyles from '../../detailedView.css';
import ContactHistory from './ContactHistory';

export default class ContactContent extends React.Component {

  public render() {
    return (
      <div className={detailedViewStyles.content}>
        <ContactTabs modelType="contact"/>
        <ContactHistory />
      </div>
    );
  }
}

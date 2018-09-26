import * as React from 'react';
import { OrganizationTabs } from '../../../lead/EditLead/EditLeadContent/EditLeadTabs/EditLeadTabs';
import * as detailedViewStyles from '../../detailedView.css';
export default class OrganizationContent extends React.Component {

  public render() {
    return (
      <div className={detailedViewStyles.content}>
        <OrganizationTabs modelType="organization" />
      </div>
    );
  }
}

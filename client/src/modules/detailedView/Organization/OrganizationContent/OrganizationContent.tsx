import * as React from 'react';
import * as detailedViewStyles from '../../detailedView.css';
import OrganizationHistory from './OrganizationHistory';
export default class OrganizationContent extends React.Component {

  public render() {
    return (
      <div className={detailedViewStyles.content}>
        <OrganizationHistory />
      </div>
    );
  }
}

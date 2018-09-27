import * as React from 'react';
import * as detailedViewStyles from '../../detailedView.css';
import ContactHistory from './ContactHistory';

export default class ContactContent extends React.Component {

  public render() {
    return (
      <div className={detailedViewStyles.content}>
        <ContactHistory />
      </div>
    );
  }
}

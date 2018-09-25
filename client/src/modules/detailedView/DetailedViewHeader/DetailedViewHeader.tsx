import * as React from 'react';
import Contact from '../../../models/Contact';
import Organization from '../../../models/Organization';

interface Props {
  model: Organization | Contact;
}

export default class DetailedViewHeader extends React.Component<Props> {

  public render() {
    return (
      <div>
        {this.props.model.name}
      </div>
    );
  }
}

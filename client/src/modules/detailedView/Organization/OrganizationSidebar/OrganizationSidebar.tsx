import * as React from 'react';
import { connect } from 'react-redux';
import Contact from '../../../../models/Contact';
import * as detailedViewStyles from '../../detailedView.css';

import OrganizationContactsCard from './OrganizationContactsCard/OrganizationContactsCard';

interface Props {
  contacts: Contact[];
}

class OrganizationSidebar extends React.Component<Props> {

  public render() {
    return (
      <div className={detailedViewStyles.sidebar}>
        <OrganizationContactsCard contacts={this.props.contacts} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contacts: state.organization.detailedOrganization.contacts,
});

export { OrganizationSidebar };

export default connect(mapStateToProps, {})(OrganizationSidebar);

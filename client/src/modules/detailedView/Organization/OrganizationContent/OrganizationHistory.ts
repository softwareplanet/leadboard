import { connect } from 'react-redux';
import ModuleHistory from '../../../../modules/common/ModelHistory/ModelHistory';

class OrganizationHistory extends ModuleHistory {
}

const mapStateToProps = (state: any) => ({
  activities: [],
  notes: state.organization.detailedOrganization.notes,
});

export default connect(mapStateToProps)(OrganizationHistory);

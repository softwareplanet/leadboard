import { connect } from 'react-redux';
import ModelHistory from '../../../common/ModelHistory/ModelHistory';

const mapStateToProps = (state: any) => ({
  activities: state.organization.detailedOrganization.activities,
  notes: state.organization.detailedOrganization.notes,
});

export default connect(mapStateToProps)(ModelHistory);

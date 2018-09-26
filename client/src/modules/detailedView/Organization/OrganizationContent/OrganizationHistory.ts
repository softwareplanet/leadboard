import { connect } from 'react-redux';
import ModelHistory from '../../../../modules/common/ModelHistory/ModelHistory';

const mapStateToProps = (state: any) => ({
  activities: [],
  notes: state.organization.detailedOrganization.notes,
});

export default connect(mapStateToProps)(ModelHistory);

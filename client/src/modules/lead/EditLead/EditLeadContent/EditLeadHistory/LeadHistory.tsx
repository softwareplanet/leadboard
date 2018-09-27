import { connect } from 'react-redux';
import ModuleHistory from '../../../../../modules/common/ModelHistory/ModelHistory';

class LeadHistory extends ModuleHistory {
}

const mapStateToProps = (state: any) => ({
  activities: state.dashboard.editLead.activities,
  notes: state.dashboard.editLead.notes,
});

export default connect(mapStateToProps)(LeadHistory);

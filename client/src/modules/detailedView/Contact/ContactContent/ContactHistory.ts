import { connect } from 'react-redux';
import ModelHistory from '../../../../modules/common/ModelHistory/ModelHistory';

const mapStateToProps = (state: any) => ({
  activities: state.contact.detailedContact.activities,
  notes: state.contact.detailedContact.notes,
});

export default connect(mapStateToProps)(ModelHistory);

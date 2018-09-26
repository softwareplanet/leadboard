import { withStyles } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { isEmpty } from 'lodash';
import * as React from 'react';
import Activity from '../../../models/Activity';
import Note from '../../../models/Note';
import Activities from '../../lead/EditLead/Activities/Activities';
import Notes from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/Notes';
import * as styles from './ModelHistory.css';

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: '#800ace',
  },
  root: {
    '&:focus': {
      outline: 'none',
    },
    font: '400 12px/16px Open Sans,sans-serif',
    minHeight: '35px',
    minWidth: '110px',
  },
})(Tabs);

interface Props {
  notes: Note[];
  activities: Activity[];
}

interface State {
  selectedTab: number;
}

class ModelHistory extends React.Component<Props, State> {
  public state = {
    selectedTab: 0,
  };

  public handleChange = (event: any, selectedTab: any) => {
    this.setState({ selectedTab });
  };

  public UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (getDoneActivities(nextProps.activities).length === 0) {
      this.setState({ selectedTab: 0 });
    }
  }

  public render() {
    const { notesCount, plannedActivities, doneActivities } = createProps(this.props.notes, this.props.activities);
    const { selectedTab } = this.state;
    const countOfDoneActivities = doneActivities.length;
    return (
      <div>
        <div className={styles.sectionTag}>
          <span className={styles.pill}>PLANNED</span>
        </div>
        <Activities done={false} activities={plannedActivities} />
        <div className={styles.sectionTag}>
          <span className={styles.pill}>PAST</span>
        </div>
        <StyledTabs value={selectedTab}
                    onChange={this.handleChange}
                    centered={true}>
          <Tab label={`NOTES ${notesCount}`} />
          <Tab label={`ACTIVITIES ${countOfDoneActivities > 0 ? countOfDoneActivities : ''}`}
               disabled={doneActivities.length <= 0} />
        </StyledTabs>
        {selectedTab === 0 && <Notes />}
        {selectedTab === 1 && <Activities done={true} activities={doneActivities} />}
      </div>
    );
  }
}

const createProps = (notes: Note[], activities: Activity[]) => {
  return {
    doneActivities: getDoneActivities(activities),
    notesCount: !isEmpty(notes) ? notes.length : '',
    plannedActivities: getPlannedActivities(activities),
  };
};

const getDoneActivities = (activities: Activity[]) => {
  return activities.filter(activity => activity.done);
};

const getPlannedActivities = (activities: Activity[]) => {
  return activities.filter(activity => !activity.done);
};

export default ModelHistory;

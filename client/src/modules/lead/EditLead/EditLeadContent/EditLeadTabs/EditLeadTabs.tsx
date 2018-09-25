import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import addActivityIconActive from '../../../../../assets/img/add-activity/add-activity-active.svg';
import addActivityIcon from '../../../../../assets/img/add-activity/add-activity.svg';
import takeNotesIconActive from '../../../../../assets/img/take-notes/take-notes-active.svg';
import takeNotesIcon from '../../../../../assets/img/take-notes/take-notes.svg';
import Activity from '../../../../../models/Activity';
import Lead from '../../../../../models/Lead';
import Note from '../../../../../models/Note';
import isBlank from '../../../../../utils/isBlank';
import { createNote } from '../../../leadActions';
import { createActivity } from '../../Activities/activityActions';
import AddActivity from './AddActivity/AddActivity';
import EditLeadEditor from './EditLeadEditor/EditLeadEditor';
import * as styles from './EditLeadTabs.css';

interface Props extends RouteComponentProps<any> {
  userId: string;
  editLead: Lead;

  createActivity(activity: Activity): void;

  createNote(leadId: string, note: Note): void;
}

interface State {
  activeTab?: any;
  isFakeInputShown: boolean;
  fakeInputContent: string;
}

class EditLeadTabs extends React.Component<Props, State> {
  public state = {
    activeTab: null,
    fakeInputContent: ' take notes',
    isFakeInputShown: true,
  };

  public componentDidMount() {
    if (this.state.activeTab === null) {
      this.setState({ activeTab: <EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.saveNote} /> });
    }
  }

  public handleTab = (content: any) => {
    this.setState({
      activeTab: content, isFakeInputShown: false,
    });
    this.handleFakeInput(content);
  }

  public handleFakeInput = (activeTab: any) => {

    switch (activeTab.type) {
      case (this.getNoteEditor().type): {
        this.setState({ fakeInputContent: ' take notes' });
        break;
      }
      case (this.getAddActivity().type): {
        this.setState({ fakeInputContent: ' add activity' });
        break;
      }
      default: {
        this.setState({ fakeInputContent: ' take notes' });
        break;
      }
    }
  }

  public saveNote = (noteText: string) => {
    const note = {
      text: noteText,
      user: this.props.userId,
    };
    this.props.createNote(this.props.editLead._id, note);
    this.setState({ isFakeInputShown: true });
  }

  public saveActivity = (activity: Activity) => {
    this.props.createActivity({
      ...activity,
      assignedTo: this.props.userId,
      lead: this.props.editLead._id,
    });
    this.setState({ isFakeInputShown: true });
  }

  public cancel = () => {
    this.setState({ isFakeInputShown: true });
  }

  public render() {
    const isTakingNotesActive = this.isActive(EditLeadEditor, this.state.activeTab) || isBlank(this.state.activeTab!);
    const isAddingActivityActive = this.isActive(AddActivity, this.state.activeTab);

    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li
            className={classNames(styles.headerItem, { [styles.active]: isTakingNotesActive })}
            onClick={this.handleTab.bind(this, this.getNoteEditor())}>
            <img
              src={isTakingNotesActive ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li
            className={classNames(styles.headerItem, { [styles.active]: isAddingActivityActive })}
            onClick={this.handleTab.bind(this, this.getAddActivity())}>
            <img
              src={isAddingActivityActive ? addActivityIconActive : addActivityIcon}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.renderFakeInput(isTakingNotesActive)}
      </div>
    );
  }

  private isActive = (component: any, activeTab: any) => {
    return (activeTab ? activeTab.type : null) === component;
  }

  private renderFakeInput = (notesCondition: boolean) => {
    if (this.state.isFakeInputShown) {
      return (
        <div
          className={styles.fakeInput}
          onClick={this.handleTab.bind(this, notesCondition ?
            this.getNoteEditor() :
            this.state.activeTab)}>
          Click here to{this.state.fakeInputContent}...
        </div>
      );
    }
    else {
      return (<div>{this.state.activeTab}</div>);
    }
  }

  private getNoteEditor = () => {
    return (<EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.saveNote} />);
  }

  private getAddActivity = () => {
    return (<AddActivity onCancel={this.onCancel} onSave={this.activitySave} />);
  }
}

const mapStateToProps = (state: any) => ({
  editLead: state.dashboard.editLead.lead,
  userId: state.auth.userid,
});

export { EditLeadTabs };

export const LeadTabs = connect(mapStateToProps, { createNote, createActivity })(withRouter(EditLeadTabs));

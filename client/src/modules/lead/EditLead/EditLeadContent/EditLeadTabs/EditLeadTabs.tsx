import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
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
  activeTab: any;
  showFakeInput: boolean;
  fakeInputContent: string;
}

class EditLeadTabs extends React.Component<Props, State> {
  public state = {
    activeTab: '',
    fakeInputContent: ' take notes',
    showFakeInput: true,
  };

  public componentDidMount() {
    if (this.state.activeTab === null) {
      this.setState({ activeTab: <EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.onNoteSave} /> });
    }
  }

  public tabHandler = (content: any) => {
    this.setState({
      activeTab: content, showFakeInput: false,
    });
    this.fakeHandler(content);
  }

  public fakeHandler = (activeTab: any) => {

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

  public onNoteSave = (noteText: string) => {
    const note = {
      text: noteText,
      user: this.props.userId,
    };
    this.props.createNote(this.props.editLead._id, note);
    this.setState({ showFakeInput: true });
  }

  public onActivitySave = (activity: Activity) => {
    this.props.createActivity({
      ...activity,
      assignedTo: this.props.userId,
      lead: this.props.editLead._id,
    });
    this.setState({ showFakeInput: true });
  }

  public onCancel = () => {
    this.setState({ showFakeInput: true });
  }

  public render() {
    const takeNotesCondition = this.isActive(EditLeadEditor, this.state.activeTab) || isBlank(this.state.activeTab);
    const addActivityCondition = this.isActive(AddActivity, this.state.activeTab);

    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li
            className={classNames(styles.headerItem, { [styles.active]: takeNotesCondition })}
            onClick={this.tabHandler.bind(this, this.getNoteEditor())}>
            <img
              src={takeNotesCondition ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li
            className={classNames(styles.headerItem, { [styles.active]: addActivityCondition })}
            onClick={this.tabHandler.bind(this, this.getAddActivity())}>
            <img
              src={addActivityCondition ? addActivityIconActive : addActivityIcon}
              className={styles.headerItemIcon}
              alt="add activity icon"
            />
            Add activity
          </li>
        </ul>
        {this.renderFakeInput(this.state.showFakeInput, takeNotesCondition)}
      </div>
    );
  }
  private isActive = (component: any, activeTab: any) => {
    return (activeTab ? activeTab.type : null) === component;
  }

  private renderFakeInput = (condition: boolean, notesCondition: boolean) => {
    if (condition) {
      return (
        <div
          className={styles.fakeInput}
          onClick={this.tabHandler.bind(this, notesCondition ?
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
    return (<EditLeadEditor height={160} onCancel={this.onCancel} onSave={this.onNoteSave} />);
  }

  private getAddActivity = () => {
    return (<AddActivity onCancel={this.onCancel} onSave={this.onActivitySave} />);
  }
}

const mapStateToProps = (state: any) => ({
  editLead: state.dashboard.editLead.lead,
  userId: state.auth.userid,
});

export { EditLeadTabs };

export default connect(mapStateToProps, { createNote, createActivity })(EditLeadTabs);

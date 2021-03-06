import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import addActivityIconActive from '../../../../../assets/img/add-activity/add-activity-active.svg';
import addActivityIcon from '../../../../../assets/img/add-activity/add-activity.svg';
import takeNotesIconActive from '../../../../../assets/img/take-notes/take-notes-active.svg';
import takeNotesIcon from '../../../../../assets/img/take-notes/take-notes.svg';
import Activity from '../../../../../models/Activity';
import Note from '../../../../../models/Note';
import isBlank from '../../../../../utils/isBlank';
import { createActivity } from '../../Activities/activityActions';
import { createNote } from '../EditLeadHistory/Notes/noteActions';
import AddActivity from './AddActivity/AddActivity';
import EditLeadEditor from './EditLeadEditor/EditLeadEditor';
import * as styles from './EditLeadTabs.css';

const CONTACT: string = 'contact';
const ORGANIZATION: string = 'organization';
const LEAD: string = 'lead';

interface Props {
  userId: string;
  model: any;
  modelType: string;

  createActivity(activity: Activity, modelName: string, modelId: string,): void;

  createNote(note: Note): void;
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
      this.setState({ activeTab: <EditLeadEditor height={160} onCancel={this.cancel} onSave={this.saveNote} /> });
    }
  }

  public handleTabChange = (content: any) => {
    this.setState({
      activeTab: content,
      isFakeInputShown: false,
    });
    this.showFakeInput(content);
  }

  public showFakeInput = (activeTab: any) => {
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
    this.props.createNote({
      ...this.getNoteChanges(),
      text: noteText,
      user: this.props.userId,
    });
    this.toggleFakeInput();
  }

  public saveActivity = (activity: Activity) => {
    const { userId } = this.props;
    this.props.createActivity({
      ...activity,
      assignedTo: userId,
      ...this.getActivityChanges(activity),
    }, this.props.modelType === 'contact' ? 'participants' : this.props.modelType, this.props.model._id);
       this.toggleFakeInput();
  }

  public toggleFakeInput = () => {
    this.setState({ isFakeInputShown: !this.state.isFakeInputShown });
  }

  public cancel = () => {
    this.toggleFakeInput();
  }

  public render() {
    const isTakingNotesActive = this.isActive(EditLeadEditor, this.state.activeTab) || isBlank(this.state.activeTab!);
    const isAddingActivityActive = this.isActive(AddActivity, this.state.activeTab);

    return (
      <div className={styles.tabs}>
        <ul className={styles.header}>
          <li
            className={classNames(styles.headerItem, { [styles.active]: isTakingNotesActive })}
            onClick={this.handleTabChange.bind(this, this.getNoteEditor())}
          >
            <img
              src={isTakingNotesActive ? takeNotesIconActive : takeNotesIcon}
              className={styles.headerItemIcon}
              alt="take note icon"
            />
            Take notes
          </li>
          <li
            className={classNames(styles.headerItem, { [styles.active]: isAddingActivityActive })}
            onClick={this.handleTabChange.bind(this, this.getAddActivity())}
          >
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
          onClick={this.handleTabChange.bind(this, notesCondition ?
            this.getNoteEditor() :
            this.state.activeTab)}
        >
          Click here to{this.state.fakeInputContent}...
        </div>
      );
    }
    else {
      return (<div>{this.state.activeTab}</div>);
    }
  }

  private getNoteEditor = () => {
    return (<EditLeadEditor height={160} onCancel={this.cancel} onSave={this.saveNote} />);
  }

  private getAddActivity = () => {
    return (<AddActivity onCancel={this.cancel} onSave={this.saveActivity} />);
  }

  private getNoteChanges(): any {
    const { model, modelType } = this.props;    
    switch (modelType) {
      case LEAD:
        return {
          lead: model._id,
          organization: model.organization ? model.organization._id : undefined,
          contact: model.contact ? model.contact._id : undefined,
        };
      case CONTACT:
        return {
          organization: model.organization ? model.organization._id : undefined,
          contact: model._id,
        };
      case ORGANIZATION:
        return {
          organization: model._id,
        };
      default:
        return {};
    }
  }

  private getActivityChanges(activity: Activity): any {
    const { model, modelType } = this.props;   
     
    switch (modelType) {
      case LEAD: {
        return {
          organization: model.organization ? model.organization._id : undefined,
          lead: activity.lead, 
          participants: [model.contact ? model.contact._id : undefined],
        };
      }
      case CONTACT:
        return {
          participants: [model._id],
        };
      case ORGANIZATION:
        return {
          organization: model._id,
          participants: [model.contact ? model.contact._id : undefined],
        };
      default:
        return {};
    }
  }
}

const leadMapLeadStateToProps = (state: any) => ({
  model: state.dashboard.editLead.lead,
  userId: state.auth.userid,
  modelType: LEAD,
});

const contactMapLeadStateToProps = (state: any) => ({
  model: state.contact.detailedContact.contact,
  userId: state.auth.userid,
  modelType: CONTACT,
});
const organizationMapLeadStateToProps = (state: any) => ({
  model: state.organization.detailedOrganization.organization,
  userId: state.auth.userid,
  modelType: ORGANIZATION,
});

const actions = { createNote, createActivity };

export const LeadTabs = connect(leadMapLeadStateToProps, actions)(EditLeadTabs);
export const OrganizationTabs = connect(organizationMapLeadStateToProps, actions)(EditLeadTabs);
export const ContactTabs = connect(contactMapLeadStateToProps, actions)(EditLeadTabs);

export { EditLeadTabs };

import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldEditView from '../CustomFieldCard/CustomFieldEditView/CustomFieldEditView';
import CustomFieldCard from '../CustomFieldCard/CustomFieldCard';
import * as styles from './CustomFields.css';

interface Props {
  customFields: CustomFieldSetting[];

  closeEditCustomFieldsMode(): void;
}

interface State {
  isAddNew: boolean;
  isEdit: boolean;
}

class CustomFields extends React.Component<Props, State> {
  public state: State = {
    isAddNew: false,
    isEdit: false,
  };

  public saveEditing = () => {
    console.log('Save custom field Action')
  };

  public cancelEditing = () => {
    console.log('Cancel editing field Action')
  };

  public triggerNewField = () => {
    this.setState((prevState) =>
      ({ isAddNew: !prevState.isAddNew })
    );
  };

  public render(){
    return (
      <div>
        <div>
          {this.props.customFields.map(customField => {
            return (
              <CustomFieldCard
                key={customField._id}
                customSettings={customField}
              />);
          })}
          {this.renderAddNew(this.state.isAddNew)}
        </div>
        <div className={styles.buttonWrapper}>
          <button
            onClick={this.props.closeEditCustomFieldsMode}
            className={styles.button}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  private renderAddNew = (trigger: boolean) => {
    return trigger ?
      (<CustomFieldEditView
        saveEdit={this.saveEditing}
        cancelEdit={this.cancelEditing}
      />) :
      (<div className={styles.newFieldContainer}>
        <span onClick={this.triggerNewField} className={styles.addNewField}>
          + Add a new field
    </span>
      </div>)
  }
}

export default CustomFields;

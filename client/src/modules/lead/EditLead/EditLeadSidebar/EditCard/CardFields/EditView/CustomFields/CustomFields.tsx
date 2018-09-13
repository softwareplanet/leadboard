import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldCard from '../CustomFieldCard/CustomFieldCard';
import * as styles from './CustomFields.css';
import CustomFieldEditCard from './CustomFieldEditCard/CustomFieldEditCard';

interface Props {
  customFields: CustomFieldSetting[];
  title: string;

  closeEditCustomFieldsMode(): void;
}


interface State {
  isEdit: boolean;
}


class CustomFields extends React.Component<Props, State> {
  public state: State = {
    isEdit: false,
  };

  public saveEditing = () => {
    console.log('Save custom field Action')
  }

  public triggerNewField = () => {
    this.setState((prevState) =>
      ({ isEdit: !prevState.isEdit })
    );
  }

  public render() {
    return (
      <div className={styles.customFieldsContainer}>
        <div className={styles.customfieldsWrapper}>
          {this.props.customFields.map(customField => {
            return (
              <CustomFieldCard
                key={customField._id}
                customSettings={customField}
              />);
          })}
          {this.renderAddNew(this.state.isEdit)}
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
      (<CustomFieldEditCard
        title={this.props.title}
        saveEdit={this.saveEditing}
        cancelEdit={this.triggerNewField}
      />) :
      (<div className={styles.newFieldContainer}>
        <span onClick={this.triggerNewField} className={styles.addNewField}>
          + Add a new field
    </span>
      </div>)
  }
}

export default CustomFields;

import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldCard from '../CustomFieldCard/CustomFieldCard';
import CustomFieldEditCard from './CustomFieldEditCard/CustomFieldEditCard';
import * as styles from './CustomFields.css';

interface Props {
  modelType: string;
  customFields: CustomFieldSetting[];

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  closeEditCustomFieldsMode(): void;

  deleteCustomField(id: string): void;
}

interface State {
  isAddNew: boolean;
}

class CustomFields extends React.Component<Props, State> {
  public state: State = {
    isAddNew: false,
  };

  public triggerNewFieldCard = () => {
    this.setState(prevState => {
      return { isAddNew: !prevState.isAddNew };
    });
  };

  public render() {
    return (
      <div className={styles.customFieldsContainer}>
        <div className={styles.customfieldsWrapper}>
          {this.props.customFields.map(customField => (
            <CustomFieldCard
              key={customField._id}
              deleteCustomField={this.props.deleteCustomField}
              customSettings={customField}
              editCustomFieldInDomain={this.props.editCustomFieldInDomain}
            />
          ))}
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
      <CustomFieldEditCard
        model={this.props.modelType}
        onSave={this.props.addCustomFieldToDomain}
        onDelete={this.props.deleteCustomField}
        onCancel={this.triggerNewFieldCard}
      /> :
      <div className={styles.newFieldContainer}>
        <span onClick={this.triggerNewFieldCard} className={styles.addNewField}>
          + Add a new field
    </span>
      </div>;
  };
}

export default CustomFields;

import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldCard from '../CustomFieldCard/CustomFieldCard';
import * as styles from './CustomFields.css';
import CustomFieldEditCard from './CustomFieldEditCard/CustomFieldEditCard';

interface Props {
  customFields: CustomFieldSetting[];
  title: string;

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  closeEditCustomFieldsMode(): void;
}


interface State {
  isAddNew: boolean;
}


class CustomFields extends React.Component<Props, State> {
  public state: State = {
    isAddNew: false,
  };

  public triggerNewFieldCard = () => {
    this.setState((prevState) =>
      ({ isAddNew: !prevState.isAddNew })
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
                addDialogTitle={this.props.title}
                customSettings={customField}
                editCustomFieldInDomain={this.props.editCustomFieldInDomain}
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
      (<CustomFieldEditCard
        model={this.props.customFields[0].model}
        addDialogTitle={this.props.title}
        onSave={this.props.addCustomFieldToDomain}
        onCancel={this.triggerNewFieldCard}
      />) :
      (<div className={styles.newFieldContainer}>
        <span onClick={this.triggerNewFieldCard} className={styles.addNewField}>
          + Add a new field
        </span>
      </div>)
  }
}

export default CustomFields;

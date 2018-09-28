import * as React from 'react';
import Contact from '../../../../../../../../models/Contact';
import CustomField from '../../../../../../../../models/customFields/CustomField';
import CustomFieldData from '../../../../../../../../models/customFields/CustomFieldData';
import Organization from '../../../../../../../../models/Organization';
import * as commonStyles from '../../../../../../../../styles/common.css';
import isBlank from '../../../../../../../../utils/isBlank';
import EditFieldGroup from '../EditFieldGroup/EditFieldGroup';
import * as styles from './BulkEditView.css';

interface State {
  _id: string;
  name: string;
  custom: CustomField[];
}

interface Props {
  model: Contact | Organization;
  customFields: CustomFieldData[];

  onChange(state: State): void;

  onCancel(): void;
}

class BulkEditView extends React.Component<Props, State> {

  public state: State = {
    _id: this.props.model._id,
    custom: this.props.model.custom,
    name: this.props.model.name,
  };

  public render() {
    return (
      <div className={styles.editView}>
        <div>
          {this.createFieldGroups()}
        </div>
        <div className={styles.actions}>
          <button className={commonStyles.button}
                  onClick={this.props.onCancel}>
            Cancel
          </button>
          <button className={styles.saveBtn}
                  onClick={this.onSaveAllClicked}>
            Save all
          </button>
        </div>
      </div>
    );
  }

  private isNameValid(name: string) {
    return !isBlank(name);
  }

  private onChangeEditField = (key: string, value: any) => {
    if (key === 'Name') {
      this.setState({ name: value });
    } else {
      const updatedCustom = [...this.state.custom];
      const customField = updatedCustom.find(custom => custom.key === key);
      if (customField) {
        const customFieldIndex = updatedCustom.indexOf(customField);
        const updatedCustomField = { ...customField };
        updatedCustomField.value = value;
        updatedCustom.splice(customFieldIndex, 1, updatedCustomField);
      } else {
        const modelCustomField = { key, value };
        updatedCustom.push(modelCustomField);
      }
      this.setState({ custom: updatedCustom });
    }
  };

  private onSaveAllClicked = () => {
    if (this.isNameValid(this.state.name)) {

      this.props.onChange(this.state);
    }
  };

  private getEditableFields(): CustomFieldData[] {
    let result = [
      {
        isAlwaysVisible: true,
        isDefault: true,
        isShownInAddDialog: true,
        key: 'Name',
        model: '',
        name: 'Name',
        type: 'string',
        value: this.props.model.name,
      },
    ];
    result = result.concat(this.props.customFields);
    return result;
  }

  private createFieldGroups() {
    return this.getEditableFields().map(field => (
      <EditFieldGroup
        key={field.key}
        fieldKey={field.key}
        name={field.name}
        value={field.value}
        isValid={field.name === 'Name' ? this.isNameValid(this.state.name) : true}
        onChange={this.onChangeEditField}
      />
    ));
  }
}

export default BulkEditView;

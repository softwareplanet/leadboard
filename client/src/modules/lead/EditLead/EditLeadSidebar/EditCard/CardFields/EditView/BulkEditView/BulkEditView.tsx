import * as React from 'react';
import Contact from '../../../../../../../../models/Contact';
import CustomFieldData from '../../../../../../../../models/customFields/CustomFieldData';
import Organization from '../../../../../../../../models/Organization';
import * as commonStyles from '../../../../../../../../styles/common.css';
import isBlank from '../../../../../../../../utils/isBlank';
import EditFieldGroup from '../EditFieldGroup/EditFieldGroup';
import * as styles from './BulkEditView.css';

interface State {
  name: string,
  custom: CustomFieldData[],
}

interface Props {
  model: Contact | Organization,

  onChange(state: State): void,

  onCancel(): void,
}

class BulkEditView extends React.Component<Props, State> {

  public state: State = {
    custom: [],
    name: '',
  };

  public componentDidMount() {
    this.setState({
      name: this.props.model.name,
    });
  }

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

  private onChangeEditField = (name: string, value: any) => {
    if (name === 'Name') {
      this.setState({ name: value });
    } else {
      const updatedCustom = [...this.state.custom];
      const customField = updatedCustom.find(custom => custom.name === name);
      if (customField) {
        const customFieldIndex = updatedCustom.indexOf(customField);
        const updatedCustomField = { ...customField };
        updatedCustomField.value = value;
        updatedCustom.splice(customFieldIndex, 1, updatedCustomField);
        this.setState({ custom: updatedCustom });
      }
    }
  };

  private onSaveAllClicked = () => {
    if (this.isNameValid(this.state.name)) {
      this.props.onChange(this.state);
    }
  };

  private getEditableFields(): CustomFieldData[] {
    return [
      {
        isAlwaysShownInAddDialog: true,
        isAlwaysVisible: true,
        isDefault: true,
        name: 'Name',
        model: '',
        key: '',
        type: 'string',
        value: this.props.model.name,
      },
    ];
  }

  private createFieldGroups() {
    return this.getEditableFields().map(field => (
      <EditFieldGroup
        key={field.name}
        name={field.name}
        value={field.value}
        isValid={field.name === 'Name' ? this.isNameValid(this.state.name) : true}
        onChange={this.onChangeEditField}
      />
    ));
  }

  private isNameValid(name: string) {
    return !isBlank(name);
  }
}

export default BulkEditView;

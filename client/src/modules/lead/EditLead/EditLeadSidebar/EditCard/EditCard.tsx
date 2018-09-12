import * as React from 'react';
import Contact from '../../../../../models/Contact';
import CustomField from '../../../../../models/customFields/CustomField';
import CustomFieldData from '../../../../../models/customFields/CustomFieldData';
import CustomFieldSetting from '../../../../../models/customFields/CustomFieldSetting';
import Organization from '../../../../../models/Organization';
import CardField from './CardFields/CardField';
import BulkEditView from './CardFields/EditView/BulkEditView/BulkEditView';
import CustomFields from './CardFields/EditView/CustomFields/CustomFields';
import MainField from './CardFields/MainField';
import EditButton from './EditButton/EditButton';
import * as styles from './EditCard.css';
import SettingsButton from './SettingsButton/SettingsButton';

interface State {
  isInEditMode: boolean,
  isInCustomizeFieldsMode: boolean,
}

interface Props {
  model: Contact | Organization;
  customFieldSetting: CustomFieldSetting[];
  title: string;
  icon: any;
  customFields: CustomFieldData[];

  onUpdate(model: Contact | Organization): void;
}

class EditCard extends React.Component<Props, State> {

  public state: State = {
    isInCustomizeFieldsMode: false,
    isInEditMode: false,
  };

  public render() {
    const { isInEditMode, isInCustomizeFieldsMode } = this.state;
    const fields = this.props.customFields.map((field: CustomFieldData, index: number) =>
      <CardField
        key={index}
        field={field}
        onUpdate={this.handleCustomFieldUpdate}
      />
    );
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.titleName}>
            {this.props.title}
            </span>
          {(!isInEditMode && !isInCustomizeFieldsMode) &&
          <div>
            <EditButton onClick={this.openEditMode} />
            <SettingsButton id={this.props.model._id} showCustomize={this.openCustomizeFieldsMode} />
          </div>
          }
        </div>
        {(!isInEditMode && !isInCustomizeFieldsMode) &&
        <div>
          <MainField
            title={this.props.title}
            value={this.props.model.name}
            icon={this.props.icon}
            onUpdate={this.handleMainFieldUpdate}
          />
          {fields}
        </div>
        }
        {
          isInEditMode &&
          <BulkEditView
            customFields={this.props.customFields}
            model={this.props.model}
            onCancel={this.closeEditMode}
            onChange={this.updateModel}
          />
        }
        {
          isInCustomizeFieldsMode &&
          <CustomFields
            customFields={this.props.customFieldSetting}
            closeEditCustomFieldsMode={this.closeCustomizeFieldsMode}
          />
        }
      </div>
    );
  }

  private openCustomizeFieldsMode = () => {
    this.setState({ isInCustomizeFieldsMode: true });
  };

  private closeCustomizeFieldsMode = () => {
    this.setState({ isInCustomizeFieldsMode: false });
  };

  private openEditMode = () => {
    this.setState({ isInEditMode: true });
  };

  private closeEditMode = () => {
    this.setState({ isInEditMode: false });
  };

  private updateModel = (model: any) => {
    this.props.onUpdate(model);
    this.closeEditMode();
  };

  private handleMainFieldUpdate = (newValue: any) => {
    const updatedModel = { ...this.props.model };
    updatedModel.name = newValue;
    this.updateModel(updatedModel);
  };

  private handleCustomFieldUpdate = (key: string, value: any) => {
    const updatedModel = { ...this.props.model };
    updatedModel.custom = [...this.props.model.custom];
    const customField = updatedModel.custom.find((field: CustomField) => field.key === key);
    if (customField) {
      customField.value = value;
    } else {
      updatedModel.custom.push({ key, value });
    }
    this.updateModel(updatedModel);
  };
}

export default EditCard;

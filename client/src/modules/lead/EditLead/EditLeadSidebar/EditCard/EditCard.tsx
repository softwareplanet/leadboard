import * as React from 'react';
import Contact from '../../../../../models/Contact';
import CustomField from '../../../../../models/CustomField';
import Organization from '../../../../../models/Organization';
import CardField from './CardFields/CardField';
import BulkEditView from './CardFields/EditView/BulkEditView/BulkEditView';
import EditCustomField from './CardFields/EditView/EditCustomField/EditCustomField';
import MainField from './CardFields/MainField';
import EditButton from './EditButton/EditButton';
import * as styles from './EditCard.css';
import SettingsButton from './SettingsButton/SettingsButton';

interface State {
  isInEditMode: boolean,
  isInCustomizeFieldsMode: boolean,
}

interface Props {
  model: Contact | Organization,
  title: string,
  icon: any,

  onUpdate(model: Contact | Organization): void,
}

class EditCard extends React.Component<Props, State> {
  public state: State = {
    isInCustomizeFieldsMode: false,
    isInEditMode: false,
  };

  public render() {
    const { isInEditMode } = this.state;
    const { isInCustomizeFieldsMode } = this.state;
    const fields = this.props.model.custom.map((field: any, index: number) =>
      <CardField key={index}
                 field={field}
                 onUpdate={this.handleCustomFieldUpdate} />);
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
          <MainField title={this.props.title}
                     value={this.props.model.name}
                     icon={this.props.icon}
                     onUpdate={this.handleMainFieldUpdate} />
          {fields}
        </div>
        }
        {
          isInEditMode &&
          <BulkEditView model={this.props.model}
                        onCancel={this.closeEditMode}
                        onChange={this.updateModel} />
        }
        {
          <EditCustomField/>
        }
      </div>
    );
  }

  private openCustomizeFieldsMode = () => {
    this.setState({ isInCustomizeFieldsMode: true });
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

  private handleCustomFieldUpdate = (name: string, value: any) => {
    const updatedModel = { ...this.props.model };
    updatedModel.custom = [...this.props.model.custom];
    updatedModel.custom.find((customField: CustomField) => customField.name === name)!.value = value;
    this.updateModel(updatedModel);
  };
}

export default EditCard;

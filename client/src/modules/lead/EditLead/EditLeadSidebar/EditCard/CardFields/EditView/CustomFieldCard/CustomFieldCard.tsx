import * as classNames from 'classnames';
import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import CustomFieldEditCard from '../CustomFields/CustomFieldEditCard/CustomFieldEditCard';
import * as styles from './CustomFieldCard.css';

interface Props {
  customSettings: CustomFieldSetting;

  editCustomFieldInDomain(customField: CustomFieldSetting): void;

  deleteCustomField(id: string): void;
}

interface State {
  editMode: boolean;
}

class CustomFieldCard extends React.Component<Props, State> {
  public state: State = {
    editMode: false,
  };

  public render() {
    return !this.state.editMode ? this.renderCard() : this.renderEditCard();
  }

  private editModeHandler = () => {
    this.setState(prevState => {
      return { editMode: !prevState.editMode };
    });
  };

  private onCustomFieldDelete = () => {
    this.props.deleteCustomField(this.props.customSettings._id ? this.props.customSettings._id : '');
  };

  private renderCard = () => {
    return (
      <div>
        <div className={classNames(styles.item, { [styles.editable]: this.isEditable() })}>
          <div className={styles.fieldName}>
            <span className={styles.icon}>A̲</span>
            <div className={styles.title}>
              {this.props.customSettings.name}
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={this.editModeHandler}>
                <span>
                  Edit
              </span>
              </button>
              <DeleteButton className={styles.editButton} onClick={this.onCustomFieldDelete} />
            </div>
          </div>
          <ul className={styles.properties}>
            {this.props.customSettings.isAlwaysVisible ? <li>Always visible on sidebar</li> : null}
          </ul>
        </div>
      </div>
    );
  };

  private renderEditCard = () => {
    return (
      <CustomFieldEditCard
        onDelete={this.props.deleteCustomField}
        field={this.props.customSettings}
        model={this.props.customSettings.model}
        onSave={this.props.editCustomFieldInDomain}
        onCancel={this.editModeHandler}
      />);
  };

  private isEditable() {
    return !this.props.customSettings.isDefault;
  }
}

export default CustomFieldCard;

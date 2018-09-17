import * as classNames from 'classnames';
import * as React from 'react';
import trashIcon from '../../../../../../../../assets/trash-icon.svg';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
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

  public editModeHandler = () => {
    this.setState(prevState => {
      return { editMode: !prevState.editMode };
    });
  };

  public render() {
    return !this.state.editMode ? this.renderCard() : this.renderEditCard();
  }

  private onCustomFieldDelete = () => {
    if (window.confirm('You will delete the field from everywhere' +
      ' in your Pipedrive as well as delete data stored' +
      ' within this field. Are you sure you want to delete?')
    ) {
      this.props.deleteCustomField(this.props.customSettings._id ? this.props.customSettings._id : '');
    }
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
              <button className={styles.deleteButton} onClick={this.onCustomFieldDelete}>
                <img src={trashIcon} alt="trash-icon" />
              </button>
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

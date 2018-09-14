import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldEditCard.css';


interface Props {
  field?: CustomFieldSetting;
  title: string;
  editMode: string;

  onSave(customField: CustomFieldSetting): void;

  cancelEdit(): void;
  saveEdit(): void;
}

interface State {
  name: string;
  isAlwaysShownInAddDialog: boolean;
  isAlwaysVisible: boolean;
}

class CustomFieldEditCard extends React.Component<Props, State> {
  public state: State = {
    name: '',
    isAlwaysShownInAddDialog: false,
    isAlwaysVisible: true,
    };
  
  public Save = () => {
    let fieldToSave = {
      name: this.state.name,
      model: this.props.title,
      type: 'string',
      isDefault: false,
      isAlwaysShownInAddDialog: this.state.isAlwaysShownInAddDialog,
      isAlwaysVisible: this.state.isAlwaysVisible,
    }

    this.props.onSave(fieldToSave)
  }

  public nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({name: e.currentTarget.value})
  }
  public isAlwaysShownInAddDialogHandler = () => {
    this.setState({
      isAlwaysShownInAddDialog: !this.state.isAlwaysShownInAddDialog,
    })
  }
  public isAlwaysVisibleHandler = () => {
    this.setState({
      isAlwaysVisible: !this.state.isAlwaysVisible,
    })
  }

  public render() {
    return (
      <div className={styles.editFieldContainer}>
        <div className={styles.editFieldWrapper}>
          <span className={styles.editFieldLabel}>Field name</span>
          <div className={styles.editNameWrap}>
            <span className={styles.nameInputWrap}>
              <input
                type="text"
                className={styles.nameInput}
                maxLength={64}
                value={this.props.field ? this.props.field.name :
                  this.state.name}
                onChange={this.nameHandler}
              />
            </span>
          </div>
          <div className={styles.visibilityOptions}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={this.props.field ? this.props.field.isAlwaysVisible :
              this.state.isAlwaysVisible}
              onChange={this.isAlwaysVisibleHandler} 
              />
              <span>Always visible on sidebar</span>
            </label>
            <label className={styles.checkboxLabel}>
              Appears in "Add new {this.props.title.toLowerCase()}" dialogue
              <input 
                type="checkbox"
                checked={this.props.field ? this.props.field.isAlwaysShownInAddDialog:   this.state.isAlwaysShownInAddDialog}
                onChange={this.isAlwaysShownInAddDialogHandler} 
              />
              <span className={styles.checkMark}></span>
            </label>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button 
            className={styles.cancelButton}
            onClick={this.props.cancelEdit}
          >
          Cancel
          </button>
          <button 
            className={styles.saveButton}
            onClick={this.Save}
            >
            Save
            </button>
        </div>
      </div>
    );
  }
}

export { CustomFieldEditCard };

export default CustomFieldEditCard;

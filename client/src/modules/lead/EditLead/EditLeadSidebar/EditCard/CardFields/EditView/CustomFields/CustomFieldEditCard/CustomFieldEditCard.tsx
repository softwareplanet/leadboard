import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../../models/customFields/CustomFieldSetting';
import isBlank from '../../../../../../../../../utils/isBlank';
import * as styles from './CustomFieldEditCard.css';


interface Props {
  field?: CustomFieldSetting;
  addDialogTitle: string;
  model: string;

  onSave(customField: CustomFieldSetting): void;

  onCancel(): void;
}

interface State {
  name: string;
  isShownInAddDialog: boolean;
  isAlwaysVisible: boolean;
}

class CustomFieldEditCard extends React.Component<Props, State> {
  public state: State = {
    isAlwaysVisible: this.props.field ? this.props.field.isAlwaysVisible : true,
    isShownInAddDialog: this.props.field ? this.props.field.isShownInAddDialog : false,
    name: this.props.field ? this.props.field.name : '',
  };

  private nameInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  public saveHandler = () => {
    const fieldToSave: CustomFieldSetting = {
      _id: this.props.field ? this.props.field!._id : undefined,
      isAlwaysVisible: this.state.isAlwaysVisible,
      isDefault: false,
      isShownInAddDialog: this.state.isShownInAddDialog,
      model: this.props.model,
      name: this.state.name,
      type: 'string',
    }

    if (isBlank(this.nameInputRef.current!.value)) {
      this.nameInputRef.current!.className = styles.invalidName;
    }
    else {
      this.props.onSave(fieldToSave);
      this.props.onCancel();
    }
  }

  public nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value })
    this.nameInputRef.current!.className = styles.nameInput;
  }

  public addDialogHandler = () => {
    this.setState({
      isShownInAddDialog: !this.state.isShownInAddDialog,
    })
  }

  public visiblityHandler = () => {
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
                value={this.state.name}
                onChange={this.nameHandler}
                ref={this.nameInputRef}
              />
            </span>
          </div>
          <div className={styles.visibilityOptions}>
            <label className={styles.checkboxLabel}>
              Always visible on sidebar
              <input type="checkbox" checked={this.state.isAlwaysVisible}
              onChange={this.visiblityHandler} 
              />
              <span className={styles.checkMark} />
            </label>
            <label className={styles.checkboxLabel}>
              Appears in "Add new {this.props.addDialogTitle.toLowerCase()}" dialogue
              <input 
                type="checkbox"
                checked={this.state.isShownInAddDialog}
                onChange={this.addDialogHandler}
              />
              <span className={styles.checkMark} />
            </label>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.cancelButton}
            onClick={this.props.onCancel}
            id={'cancelButton'}
          >
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={this.saveHandler}
            id={'saveButton'}
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

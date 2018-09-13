import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldEditView.css';


interface Props {
  field?: CustomFieldSetting;
  title: string;

  cancelEdit(): void;
  saveEdit(): void;
}

class CustomFieldEditView extends React.Component<Props, object> {
  public render(){
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
              />
            </span>
          </div>
          <div className={styles.visibilityOptions}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={this.props.field ? this.props.field.isAlwaysVisible : true} />
              <span>Always visible on sidebar</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={this.props.field ? this.props.field.isAlwaysShownInAddDialog : false } />
              <span>Appears in "Add new {this.props.title}" dialogue</span>
            </label>
          </div>
          <div className={styles.actionButtons}>
          <button>Cancel</button>
          <button>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomFieldEditView;

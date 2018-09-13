import * as classNames from 'classnames';
import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldCard.css';
import trashIcon from '../../../../../../../../assets/trash-icon.svg';

interface Props {
  customSettings: CustomFieldSetting;

  deleteCustomField(id: string): void;
}

class CustomFieldCard extends React.Component<Props> {
  private onCustomFieldDelete = () => {
    if (window.confirm('You will delete the field from everywhere' +
      ' in your Pipedrive as well as delete data stored' +
      ' within this field. Are you sure you want to delete?')
    ) {
      this.props.deleteCustomField(this.props.customSettings._id);
    }
  };

  public render() {
    return (
      <div>
        <div className={classNames(styles.item, { [styles.editable]: !this.checkDefault() })}>
          <div className={styles.fieldName}>
            <span className={styles.icon}>A̲</span>
            <div className={styles.title}>
              {this.props.customSettings.name}
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton}>
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
            {this.props.customSettings.isAlwaysShownInAddDialog ?
              <li>Appears in "Add new {this.props.customSettings.model}" dialogue</li> : null}
          </ul>
        </div>
      </div>
    );
  }

  private checkDefault = () => {
    return this.props.customSettings.isDefault;
  };
}

export default CustomFieldCard;

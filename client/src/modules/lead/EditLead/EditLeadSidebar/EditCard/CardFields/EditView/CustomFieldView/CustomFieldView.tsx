import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldView.css';
import * as classNames from 'classnames';

interface Props {
  customSettings: CustomFieldSetting;
}

class CustomFieldView extends React.Component<Props> {
  public render() {
    return (
      <div>
        <div className={classNames(styles.item, {[styles.editable]: this.checkDefault()})}>
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
  }
}

export default CustomFieldView;

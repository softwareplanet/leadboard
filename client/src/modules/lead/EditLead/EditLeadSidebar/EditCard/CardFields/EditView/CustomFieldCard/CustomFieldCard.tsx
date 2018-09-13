import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldCard.css';

interface Props {
  customSettings: CustomFieldSetting;
}

class CustomFieldCard extends React.Component<Props> {
  public render() {
    return (
      <div>
        <div className={styles.item}>
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
}

export default CustomFieldCard;

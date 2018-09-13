import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import CustomFieldCard from '../CustomFieldView/CustomFieldCard';
import * as styles from './CustomFields.css';

interface Props {
  customFields: CustomFieldSetting[];

  closeEditCustomFieldsMode(): void;
}

class CustomFields extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        {this.props.customFields.map(customField => {
          return (
            <CustomFieldCard
              key={customField._id}
              customSettings={customField}
            />);
        })}
        <div className={styles.buttonWrapper}>
          <button
            onClick={this.props.closeEditCustomFieldsMode}
            className={styles.button}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default CustomFields;

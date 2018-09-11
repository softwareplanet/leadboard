import * as React from 'react';
import EditCustomField from '../CustomFieldView/CustomFieldView';
import CustomFieldSetting from '../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFields.css';

interface Props {
  model: string,
  customFields: CustomFieldSetting[],

  closeEditCustomFieldsMode(): void,
}

class EditCustomFieldsView extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        {this.props.customFields.map(customField => {
           return (<EditCustomField customSettings={customField} />);
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

export default EditCustomFieldsView;

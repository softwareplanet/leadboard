import * as React from 'react';
import EditCustomField from '../EditCustomField/EditCustomField';
import CustomFieldSetting from '../../../../../../../../models/CustomFieldSetting';
import * as styles from './CustomFields.css';

interface Props {
  model: string,
  customFields: CustomFieldSetting[],

  closeEditCustomFieldsMode():void,
}

class EditCustomFieldsView extends React.Component<Props, object> {
  public render() {
    return (
      <div>
        {this.props.customFields.map(customField => {
          if (this.props.model === customField.model) {
            <EditCustomField customSettings={customField} />;
          }
        })}
        <button
          onClick={() => this.props.closeEditCustomFieldsMode}
          className={styles.button}
        >
          Done
        </button>
      </div>
    );
  }
}

export default EditCustomFieldsView;

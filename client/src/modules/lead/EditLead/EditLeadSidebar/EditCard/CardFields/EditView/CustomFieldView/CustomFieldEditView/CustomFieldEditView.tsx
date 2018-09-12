import * as React from 'react';
import CustomFieldSetting from '../../../../../../../../../models/customFields/CustomFieldSetting';
import * as styles from './CustomFieldEditView.css';


interface Props {
  field?: CustomFieldSetting;

  cancelEdit(): void;
  saveEdit(): void;
}

class CustomFieldEditView extends React.Component<Props, object> {
  public render() {
    return (
      <div className={styles.cancelButton}>
        Hi
      </div>
    );
  }
}

export default CustomFieldEditView;

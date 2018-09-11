import * as React from 'react';
import * as styles from './EditCustomField.css';

class EditCustomField extends React.Component {
  public render(){
    return (
      <div>
        <div className={styles.item}>
          <div className={styles.fieldName}>
            <span className={styles.icon}>
A̲
            </span>
            <div className={styles.title}>
Something
            </div>
            <div className={styles.actions}>

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EditCustomField;
import * as React from 'react';
import * as styles from './AddContact.css';


class AddContact extends React.Component {
  public render() {
    return (
      <div>
        <button type="button" className={styles.button}>
          Add person
        </button>
      </div>
    )
  }
}

export default AddContact;

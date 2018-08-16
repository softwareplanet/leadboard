import React, { Component } from "react";
import styles from "./EditView.css";
import EditFieldGroup from "./EditFieldGroup/EditFieldGroup";

class EditView extends Component {

  render() {
    const fields = this.props.fields.map(field => {
      return <EditFieldGroup
        name={field.name}
        value={field.value}
      />;
    });

    return (
      <div className={styles.editView}>
        <div className={styles.fields}>
          {fields}
        </div>
        <div className={styles.actions}>
          <button className={styles.button}>Cancel</button>
          <button className={styles.saveBtn}>Save all</button>
        </div>
      </div>
    );
  }

}

export default EditView;
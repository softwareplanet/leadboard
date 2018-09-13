import * as React from 'react';
import * as styles from './CustomFields.css';

const MODEL_NAMES = ['Lead', 'Organization', 'Contact'];

export default class CustomizeFields extends React.Component {

  private static getTabName(modelName: string): string {
    return modelName + 's';
  }

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.header}>Customize data fields</h1>
          <ul className={styles.featuresList}>
            <li className={styles.feature}>
              Use custom fields to document more specific information (like job title, lead source, priority etc.)
            </li>
            <li className={styles.feature}>
              <strong>Group</strong> and <strong>filter</strong> your deals and contacts based on custom fields.
            </li>
            <li className={styles.feature}>
              Pick a custom field type that best fits your purpose - <strong>text field</strong>, <strong>multiple
              options</strong>, <strong>address</strong> etc.
            </li>
          </ul>
          <div className={styles.actions}>
            <button className={styles.addButton}>Add people field</button>
          </div>
          <div className={styles.tabs}>
            {this.createTabs(MODEL_NAMES)}
          </div>
        </div>
        <div className={styles.customFieldsTableWrapper}>
          <table>
            <thead>
            <tr className={styles.tableRow}>
              <th>Field name</th>
              <th>Type</th>
              <th>Show in details view</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className={styles.fieldName}>Name</td>
              <td className={styles.fieldType}>Text</td>
              <td className={styles.showFieldInDetailedView}>Yes</td>
            </tr>
            <tr>
              <td className={styles.fieldName}>Name</td>
              <td className={styles.fieldType}>Text</td>
              <td className={styles.showFieldInDetailedView}>Yes</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  private createTabs(modelNames: string[]) {
    return modelNames.map(modelName => (
      <button className={styles.tab}>{CustomizeFields.getTabName(modelName)}</button>
    ));
  }
}

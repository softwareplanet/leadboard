import * as React from 'react';
import { connect } from 'react-redux';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../models/DomainSettings';
import AddCustomField from '../../customFields/AddCustomField/AddCustomField';
import { getCustomFieldSettingsByModel } from '../../lead/EditLead/EditLeadSidebar/CustomFieldsService';
import { addCustomFieldToDomain, editCustomFieldInDomain } from '../customFieldsActions';
import * as styles from './CustomFields.css';

const MODEL_NAMES = ['Lead', 'Organization', 'Contact'];

interface State {
  selectedTabIndex: number;
}

interface Props {
  settings: DomainSettings;

  addCustomFieldToDomain(customField: CustomFieldSetting): void;

  editCustomFieldInDomain(customFieldUpdate: any): void;
}

class CustomizeFields extends React.Component<Props, State> {

  private static getTabName(modelName: string): string {
    return modelName + 's';
  }

  private static getFieldType(customField: CustomFieldSetting): string {
    switch (customField.type) {
      case 'string':
        return 'Text';
      default:
        return this.capitalizeFirstLetter(customField.type);
    }
  }

  private static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public state: State = {
    selectedTabIndex: 0,
  };

  public render() {
    const rows = this.createRows();

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
            <AddCustomField
              modelName={MODEL_NAMES[this.state.selectedTabIndex]}
              addCustomField={this.props.addCustomFieldToDomain}
            />
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
            {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  private convertBoolToYesNo(bool: boolean): string {
    return bool ? 'Yes' : 'No';
  }

  private createTabs = (modelNames: string[]) => {
    return modelNames.map((modelName: string, index: number) => (
      <button
        key={`tab${modelName}`}
        className={this.state.selectedTabIndex === index ? styles.tabActive : styles.tab}
        onClick={this.handleTabClick.bind(this, modelName)}
      >
        {CustomizeFields.getTabName(modelName)}
      </button>
    ));
  };

  private createRows = () => {
    const customFieldsSettings = getCustomFieldSettingsByModel(
      MODEL_NAMES[this.state.selectedTabIndex],
      this.props.settings,
    );
    return customFieldsSettings.map((customField: CustomFieldSetting) => (
      <tr key={customField._id}>
        <td className={styles.fieldName}>
          {customField.name}
        </td>
        <td className={styles.fieldType}>
          {CustomizeFields.getFieldType(customField)}
        </td>
        <td
          className={styles.showFieldInDetailedView}>

          {!customField.isDefault
            ? <span className={styles.smallLink} onClick={this.invertIsAlwaysVisible.bind(this, customField)}>
              {this.convertBoolToYesNo(customField.isAlwaysVisible)}
            </span>
            : ''}
        </td>
      </tr>
    ));
  };

  private handleTabClick = (modelName: string): void => {
    this.setState({
      selectedTabIndex: MODEL_NAMES.indexOf(modelName),
    });
  };

  private invertIsAlwaysVisible = (customField: CustomFieldSetting) => {
    const customFieldUpdate = {
      _id: customField._id,
      isAlwaysVisible: !customField.isAlwaysVisible,
    };
    this.props.editCustomFieldInDomain(customFieldUpdate);
  };

}

const mapStateToProps = (state: any) => ({
  settings: state.domain.settings,
});

export { CustomizeFields };

export default connect(
  mapStateToProps,
  {
    addCustomFieldToDomain,
    editCustomFieldInDomain,
  })(CustomizeFields);

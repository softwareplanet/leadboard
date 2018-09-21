import ContactData from '../../../models/ContactData';
import CustomField from '../../../models/customFields/CustomField';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import { basicColumnStyles, rightAlignStyles } from '../../common/Table/ColumnStyles';

export interface ContactColumn {
  dataField: string;
  text: string;

  [name: string]: string | object;
}

interface Styles {
  [name: string]: object;
}

const columnsWithRightAlignment = ['Closed leads', 'Opened leads', 'People'];

export const injectCustomFields = (contact: ContactData) => {
  contact.custom.forEach((field: CustomField) => {
    contact[field.key] = field.value;
  });
  return contact;
};

export function composeTableColumns(
  modelColumns: ContactColumn[],
  customFieldSettings: CustomFieldSetting[],
): ContactColumn[] {
  return [
    ...modelColumns,
    ...customFieldSettings.map(fieldSettingToColumn),
    {
      dataField: 'closedLeads',
      text: 'Closed leads',
    },
    {
      dataField: 'openedLeads',
      text: 'Opened leads',

    },
    {
      dataField: 'owner.email',
      text: 'Owner',
    },
  ].map(injectStyles);
}

export function getTableData(model: string, contacts: any[], customFieldSettings: CustomFieldSetting[], modelColumns: any[]) {
  const rows = contacts.map(injectCustomFields);
  const modelCustomFieldSettings = customFieldSettings.filter(field => field.model === model);
  const columns = composeTableColumns(modelColumns, modelCustomFieldSettings);
  return {
    columns,
    rows,
  };
}

const injectStyles = (column: ContactColumn) => {
  return Object.assign(column, getStyles(column.text));
};

function fieldSettingToColumn(field: CustomFieldSetting): ContactColumn {
  return {
    dataField: field._id || '',
    text: field.name,
  };
}

function getStyles(name: string): Styles {
  if (columnsWithRightAlignment.indexOf(name) > -1) {
    return { ...rightAlignStyles };
  }
  return { ...basicColumnStyles };
}

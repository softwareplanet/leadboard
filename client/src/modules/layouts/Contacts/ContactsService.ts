import AggregatedContact from '../../../models/AggregatedContact';
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

const ClosedLeadsColumn = 'Closed leads';
const OpenedLeadsColumn = 'Opened leads';
const PeopleColumn = 'People';
const OwnerColumn = 'Owner';

const columnsWithRightAlignment = [ClosedLeadsColumn, OpenedLeadsColumn, PeopleColumn];

export const injectCustomFields = (contact: AggregatedContact) => {
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
      text: ClosedLeadsColumn,
    },
    {
      dataField: 'openedLeads',
      text: OpenedLeadsColumn,
    },
    {
      dataField: 'owner.email',
      text: OwnerColumn,
    },
  ].map(injectStyles);
}

export function getTableData(
  model: string,
  contacts: any[],
  customFieldSettings: CustomFieldSetting[],
  modelColumns: any[],
) {
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

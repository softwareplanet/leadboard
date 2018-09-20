import CustomField from '../../../models/customFields/CustomField';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import { basicColumnStyles, rightAlignStyles } from '../../common/Table/ColumnStyles';

interface ContactDataField {
  name: string;
  value: string;
}

interface ContactColumn {
  dataField: string;

  [name: string]: string;
}

interface Styles {
  [name: string]: object;
}

interface ContactData {
  [name: string]: string;
}

const contactModel = 'Contact';
const columnsWithRightAlignment = ['Closed leads', 'Opened leads', 'People'];

export function getTableData(model: string, contacts: any[], customFieldSetting: CustomFieldSetting[]) {
  const contactsDataFields = contacts.map((contact: any) => {
    const customFields = getCustomFieldsByDomainSettings(model, customFieldSetting, contact.custom);
    return createContactDataFieldsEntity(model, contact, customFields);
  });
  const contactsData = contactsDataFields.map((dataFields: ContactDataField[]) => createContactData(dataFields));
  const firstContactFieldsForTemplate = contactsDataFields[0];
  const contactColumns = firstContactFieldsForTemplate.map((data: ContactDataField) => createColumn(data));

  return {
    contactColumns,
    contactsData,
  };
}

function createContactDataFieldsEntity(model: string, contact: any, customs: ContactDataField[]): ContactDataField[] {
  if (model === contactModel) {
    return [
      {
        name: 'Name',
        value: contact.name,
      },
      {
        name: 'Organization',
        value: contact.organization.name,
      },
      ...customs,
      {
        name: 'Closed leads',
        value: contact.closedLeads,
      },
      {
        name: 'Opened leads',
        value: contact.openedLeads,
      },
      {
        name: 'Owner',
        value: contact.owner.email,
      },
    ];
  } else {
    return [
      {
        name: 'Name',
        value: contact.name,
      },
      ...customs,
      {
        name: 'People',
        value: contact.contacts,
      },
      {
        name: 'Closed leads',
        value: contact.closedLeads,
      },
      {
        name: 'Opened leads',
        value: contact.openedLeads,
      },
      {
        name: 'Owner',
        value: contact.owner.email,
      },
    ];
  }
}

function createContactData(dataFields: ContactDataField[]): ContactData {
  const contactData = {};
  dataFields.map((dataField: ContactDataField) => {
    contactData[dataField.name] = dataField.value;
  });
  return contactData;
}

function getCustomFieldsByDomainSettings(
  model: string,
  customFieldsSettings: CustomFieldSetting[],
  modelCustomFields: CustomField[],
): ContactDataField[] {
  return customFieldsSettings.filter(field => field.model === model).map(field => {
    const nextField = modelCustomFields.find(modelField => modelField.key === field._id);
    return {
      name: field.name,
      value: nextField ? nextField.value : '',
    };
  });
}

function getStyles(name: string): Styles {
  if (columnsWithRightAlignment.indexOf(name) > -1) {
    return { ...rightAlignStyles };
  }
  return { ...basicColumnStyles };
}

function createColumn(data: ContactDataField): ContactColumn {
  return {
    dataField: data.name,
    ...getStyles(data.name),
    text: data.name,
  };
}

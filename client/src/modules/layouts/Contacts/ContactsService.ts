import ContactData from '../../../models/ContactData';
import CustomField from '../../../models/customFields/CustomField';
import CustomFieldSetting from '../../../models/customFields/CustomFieldSetting';
import { basicColumnStyles, rightAlignStyles } from '../../common/Table/ColumnStyles';

const contactModel = 'Contact';
const columnsWithRightAlign = ['Closed leads', 'Opened leads', 'People'];

export function getTableData(model: string, contacts: any, customFieldSetting: CustomFieldSetting[]) {
  const contactsDataFields = getContactsDataFields(model, contacts, customFieldSetting);
  const contactsData = getContactsData(contactsDataFields);
  const firstContactFieldsForTemplate = contactsDataFields[0];
  const contactColumns = getContactsColumns(firstContactFieldsForTemplate);

  return {
    contactColumns,
    contactsData,
  };
}

function getContactsDataFields(model: string, contacts: ContactData[], customFieldSetting: CustomFieldSetting[]) {
  const contactsDataFields: any[] = [];
  contacts.map(contact => {
    const customs = getCustomFieldsByDomainSettings(model, customFieldSetting, contact.custom);
    const contactDataEntity = createContactDataEntity(model, contact, customs);
    contactsDataFields.push(contactDataEntity);
  });
  return contactsDataFields;
}

function createContactDataEntity(model: string, contact: any, customs: any[]) {
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

function getContactsData(contactDataFields: any[]) {
  const contactsData: any[] = [];
  contactDataFields.map(dataFields => {
    contactsData.push(createContactData(dataFields));
  });
  return contactsData;
}

function createContactData(dataFields: any) {
  const contactData = {};
  dataFields.map((dataField: any) => {
    contactData[dataField.name] = dataField.value;
  });
  return contactData;
}

function getCustomFieldsByDomainSettings(model: string, customFieldsSettings: CustomFieldSetting[], modelCustomFields: CustomField[]) {
  const customs: any[] = [];
  customFieldsSettings.map(field => {
    if (field.model === model) {
      const nextField = modelCustomFields.find(modelField => modelField.key === field._id);
      const customField = {
        name: field.name,
        value: nextField ? nextField.value : '',
      };
      customs.push(customField);
    }
  });
  return customs;
}

function getStyles(name: string) {
  if (columnsWithRightAlign.indexOf(name) > -1) {
    return { ...rightAlignStyles };
  }
  return { ...basicColumnStyles };
}

function getContactsColumns(contactsDataField: any[]) {
  const columns: any[] = [];
  contactsDataField.map((data: any) => {
    columns.push(createColumn(data));
  });
  return columns;
}

function createColumn(data: any) {
  return {
    dataField: `${data.name}`,
    ...getStyles(data.name),
    text: `${data.name}`,
  };
}

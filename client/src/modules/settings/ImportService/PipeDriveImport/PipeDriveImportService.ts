import axios from 'axios';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import store from '../../../../store';
import {
  exportContactFields,
  exportContacts,
  exportOrganizationFields,
  exportOrganizations,
} from './pipeDriveExportService';
import { setImportStatus } from './pipeDriveImportActions';

const organizationModel = 'Organization';
const contactModel = 'Contact';

const redundantFieldKeys = [
  'id',
  'owner_id',
  'org_id',
  'user_id',
  'update_time',
  'visible_to',
  'address',
  'phone',
  'email',
];

const importStarted = { status: true, message: 'Import started' };
const importSuccessful = { status: true, message: 'Import successful' };
const exportDataFromPipedrive = { status: true, message: 'Exporting data from Pipedrive' };
const importRejected = { status: false, message: 'Import rejected' };

export const startImport = async (domainId: string, token: string) => {
  try {
    store.dispatch(setImportStatus(exportDataFromPipedrive));

    const contactFields: any[] = await exportContactFields(token);
    const organizationFields: any[] = await exportOrganizationFields(token);
    const organizations: any[] = await exportOrganizations(token);
    const contacts: any[] = await exportContacts(token);

    store.dispatch(setImportStatus(importStarted));

    await addNewDataToDB(organizations, organizationFields, contacts, contactFields, domainId);

    store.dispatch(setImportStatus(importSuccessful));
  } catch (error) {
    store.dispatch(setImportStatus(importRejected));
  }
};

const pipeDriveModelFieldsToLeadboardCustomFieldSettings = (
  PipedriveModelFields: any[],
  modelName: string,
): CustomFieldSetting[] => {
  return PipedriveModelFields
    .filter(field => !redundantFieldKeys.includes(field.key))
    .map(field => ({
        isAlwaysVisible: true,
        isDefault: false,
        isShownInAddDialog: false,
        model: modelName,
        name: field.name,
        type: 'string',
      }
    ));
};

const customFieldsByDomainSettings = (
  customFieldsDomainSettings: CustomFieldSetting[],
  pipedriveModelFields: any[],
  model: any,
) => {
  const custom: any[] = [];
  customFieldsDomainSettings.forEach(fieldSettings => {
    const modelField = pipedriveModelFields.find(field => field.name === fieldSettings.name);
    if (modelField && model[modelField.key]) {
      if (modelField.key === 'phone' || modelField.key === 'email') {
        custom.push({
          key: fieldSettings._id,
          value: arrayToString(model[modelField.key]),
        });
      } else {
        custom.push({
          key: fieldSettings._id,
          value: model[modelField.key],
        });
      }
    }
  });
  return custom;
};

const addNewDataToDB = async (
  organizations: any[],
  pipedriveOrganizationFields: any[],
  contacts: any[],
  pipeDriveContactFields: any[],
  domainId: string,
) => {
  await addCustomFieldSettingsToDomain(
    pipeDriveModelFieldsToLeadboardCustomFieldSettings(pipedriveOrganizationFields, organizationModel),
    domainId,
  );
  await addCustomFieldSettingsToDomain(
    pipeDriveModelFieldsToLeadboardCustomFieldSettings(pipeDriveContactFields, contactModel),
    domainId,
  );
  const settings = await getDomainSettings(domainId);

  const organizationCustomFieldSettings = settings.customFields.filter((field: any) => field.model === organizationModel);
  const contactCustomFieldSettings = settings.customFields.filter((field: any) => field.model === contactModel);

  await asyncForEach(organizations, async (organization: any) => {
    const newOrganization = await addOrganizationInDB(
      transformPipedriveModelToLeadboard(organization, organizationCustomFieldSettings, pipedriveOrganizationFields),
    );

    const organizationContacts = getContactsForOrganization(contacts, organization);

    organizationContacts.forEach(contact => {
      const leadboardContact = transformPipedriveModelToLeadboard(
        contact, contactCustomFieldSettings, pipeDriveContactFields,
      );
      leadboardContact.organization = newOrganization._id;
      addContactInDB(leadboardContact);
      contacts.splice(contacts.indexOf(contact), 1);
    });
  });

  contacts.forEach((contact: any) => {
    addContactInDB(transformPipedriveModelToLeadboard(
      contact, contactCustomFieldSettings, pipeDriveContactFields,
    ));
  });
};

const addOrganizationInDB = (organization: any) => {
  return axios.post(`/api/organization`, organization)
    .then(result => result.data);
};

const addContactInDB = (contact: any) => {
  return axios.post(`/api/contact`, contact);
};

async function asyncForEach(array: any[], callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const addCustomFieldSettingsToDomain = async (customFields: CustomFieldSetting[], domainId: string) => {
  customFields.forEach(field => {
    axios
      .post(`/api/domain/${domainId}/settings/customFields`, field);
  });
};

const getDomainSettings = (domainId: string) => {
  return axios
    .get(`/api/domain/${domainId}`)
    .then(result => result.data.settings);
};

const getContactsForOrganization = (contacts: any[], organization: any) => {
  return contacts.filter(contact => (contact.org_id ? contact.org_id.value === organization.id : false));
};

const transformPipedriveModelToLeadboard = (
  model: any,
  modelCustomFieldSettings: any[],
  pipedriveModelFields: any[],
): any => ({
  custom: customFieldsByDomainSettings(modelCustomFieldSettings, pipedriveModelFields, model),
  name: model.name,
});

const arrayToString = (array: any[]) => {
  return array.map(object => object.value).join();
};

import Contact from '../../../../models/Contact';
import CustomFieldData from '../../../../models/customFields/CustomFieldData';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';

export function getCustomFieldSettings(modelType: string, settings: DomainSettings): CustomFieldSetting[] {
  return settings.customFields.filter(
    (field: CustomFieldSetting) => field.model === modelType,
  );
}

export function getFilteredFieldsByModel(model: string, settings: DomainSettings) {
  return settings.customFields.filter((customField: CustomFieldSetting) => model === customField.model);
}

export function makeCustomFieldData(modelType: string, model: Contact | Organization, settings: DomainSettings): CustomFieldData[] {
  const result: CustomFieldData[] = [];
  const customFieldSettings = getCustomFieldSettings(modelType, settings);

  customFieldSettings.map((fieldSetting: CustomFieldSetting) => {
    const customFieldData: CustomFieldData = {
      isAlwaysShownInAddDialog: fieldSetting.isAlwaysShownInAddDialog,
      isAlwaysVisible: fieldSetting.isAlwaysVisible,
      isDefault: fieldSetting.isDefault,
      key: fieldSetting._id,
      model: modelType,
      name: fieldSetting.name,
      type: fieldSetting.type,
      value: '',
    };
    const customField = model.custom.find(custom => custom.key === fieldSetting._id);
    if (customField) {
      customFieldData.value = customField.value;
    }
    if (customFieldData.isAlwaysVisible) {
      result.push(customFieldData);
    }
  });
  return result;
}

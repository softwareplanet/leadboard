import Contact from '../../../../models/Contact';
import CustomFieldData from '../../../../models/customFields/CustomFieldData';
import CustomFieldSetting from '../../../../models/customFields/CustomFieldSetting';
import DomainSettings from '../../../../models/DomainSettings';
import Organization from '../../../../models/Organization';

export function getCustomFieldSettingsByModel(model: string, settings: DomainSettings): CustomFieldSetting[] {
  return settings.customFields.filter((customField: CustomFieldSetting) => model === customField.model);
}

export function makeCustomFieldData(modelType: string, model: Contact | Organization, settings: DomainSettings): CustomFieldData[] {
  const result: CustomFieldData[] = [];
  const customFieldSettings = getCustomFieldSettingsByModel(modelType, settings);

  customFieldSettings.map((fieldSetting: CustomFieldSetting) => {
    const customFieldData: CustomFieldData = {
      isAlwaysVisible: fieldSetting.isAlwaysVisible,
      isDefault: fieldSetting.isDefault,
      isShownInAddDialog: fieldSetting.isShownInAddDialog,
      key: fieldSetting._id ? fieldSetting._id : '',
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

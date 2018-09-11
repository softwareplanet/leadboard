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

export function makeCustomFieldData(modelType: string, model: Contact | Organization, settings: DomainSettings): CustomFieldData[] {
  const result: CustomFieldData[] = [];
  const customFieldSettings = getCustomFieldSettings(modelType, settings);

  customFieldSettings.map((fieldSetting: CustomFieldSetting) => {
    const customFieldData: CustomFieldData = {
      model: modelType,
      name: fieldSetting.name,
      value: '',
      type: fieldSetting.type,
      isAlwaysVisible: fieldSetting.isAlwaysVisible,
      isAlwaysShownInAddDialog: fieldSetting.isAlwaysShownInAddDialog,
      isDefault: fieldSetting.isDefault,
    };
    customFieldData.value = model.custom.find(custom => custom.key === fieldSetting._id)!.value;
    if (customFieldData.isAlwaysVisible) {
      result.push(customFieldData);
    }
  });
  return result;
}

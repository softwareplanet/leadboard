import CustomFieldSetting from './customFields/CustomFieldSetting';

export default interface DomainSettings {
  customFields: CustomFieldSetting[],
  timezone: string,
}

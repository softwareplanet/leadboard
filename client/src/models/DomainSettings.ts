import CustomFieldSetting from './CustomFieldSetting';

export default interface DomainSettings {
  customFields: CustomFieldSetting[],
  timezone: string,
}

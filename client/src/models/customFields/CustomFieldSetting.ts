export default interface CustomFieldSetting {
  _id?: string;
  model: string;
  name: string;
  type: string;
  isAlwaysVisible: boolean;
  isShownInAddDialog: boolean;
  isDefault: boolean;
}

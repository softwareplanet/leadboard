import CustomField from './CustomField';

export default interface Organization {
  _id: string;
  name: string;
  custom: CustomField[];
  domain: string;
  timestamp: Date;
}

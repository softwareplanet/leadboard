import CustomField from './customFields/CustomField';
import User from './User';

export default interface Organization {
  _id: string;
  name: string;
  custom: CustomField[];
  domain: string;
  timestamp: Date;
  owner: User;
}

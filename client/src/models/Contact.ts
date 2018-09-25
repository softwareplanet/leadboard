import CustomField from './customFields/CustomField';
import Organization from './Organization';
import User from './User';

export default interface Contact {
  _id: string;
  name: string;
  organization?: Organization;
  custom: CustomField[];
  domain: string;
  timestamp: Date;
  owner: User;
}

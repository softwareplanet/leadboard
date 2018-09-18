import CustomField from './customFields/CustomField';
import Domain from './Domain';
import Organization from './Organization';
import User from './User';

export default interface ContactData {
  _id: string;
  name: string;
  organization?: Organization;
  custom: CustomField[];
  domain: Domain;
  closedLeads: number,
  openedLeads: number,
  owner: User;
  timestamp: Date;
}

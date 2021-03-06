import CustomField from './customFields/CustomField';
import User from './User';

export default interface AggregatedOrganization {
  _id: string;
  name: string;
  custom: CustomField[];
  domain: string;
  closedLeads: number;
  openedLeads: number;
  contacts: number;
  owner: User;
  timestamp: Date;
}

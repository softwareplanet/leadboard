import CustomField from './customFields/CustomField';
import Domain from './Domain';
import Organization from './Organization';

export default interface Contact {
  _id: string;
  name: string;
  organization?: Organization;
  custom: CustomField[];
  domain: Domain;
  timestamp: Date;
}

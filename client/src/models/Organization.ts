import CustomField from './CustomField';
import Domain from './Domain';

export default interface Organization {
  _id: string;
  name: string;
  custom: CustomField[];
  domain: string | Domain;
  timestamp: Date;
}

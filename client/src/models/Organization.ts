import CustomField from './CustomField';
import Domain from './Domain';

export default interface Organization {
  _id: string;
  name: string;
  custom: string[] | CustomField;
  domain: string | Domain;
  timestamp: Date;
}

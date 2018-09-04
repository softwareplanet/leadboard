import Custom from './Custom';
import Domain from './Domain';
import Organization from './Organization';

export default interface Contact {
  _id: string,
  name: string,
  organization: Organization,
  custom: Custom,
  domain: Domain,
  timestamp: Date
}

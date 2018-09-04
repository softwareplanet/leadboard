import Custom from './Custom';
import Domain from './Domain';

export default interface Organization {
  _id: string,
  name: string,
  custom: string[] | Custom,
  domain: string | Domain,
  timestamp: Date
}

import DomainSettings from './DomainSettings';

export default interface Domain {
  _id: string,
  name: string,
  timestamp: Date,
  settings: DomainSettings
}

import User from './User';

export default interface Note {
  _id?: string;
  lead?: string;
  contact?: string;
  organization?: string;
  text: string;
  date?: Date;
  user: string | User;
  lastUpdater?: string | User;
}

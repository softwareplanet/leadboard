import User from './User';

export default interface Note {
  _id: string;
  text: string;
  date: Date;
  user: string | User;
  lastUpdater: string | User;
}
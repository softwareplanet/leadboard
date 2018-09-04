import User from "./User";

export default interface Note {
  text: string;
  date: Date;
  user: string | User;
  lastUpdater: string | User;
}
import Contact from './Contact';
import Lead from './Lead';
import Organization from './Organization';
import ActivityType from './types/ActivityType'
import User from './User';

export default interface Activity {
  type: ActivityType;
  subject: string;
  date: Date;
  hasStartTime: boolean;
  duration: number;
  note: string;
  assignedTo: string | User,
  lead: string | Lead;
  participants: string[] | Contact[];
  organization: string | Organization;
  done: boolean;
  createdBy: string | User;
  lastEditor: string | User;
  createdAt: Date;
  updatedAt: Date;
}

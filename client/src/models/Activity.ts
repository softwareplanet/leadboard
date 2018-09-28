import Contact from './Contact';
import Lead from './Lead';
import Organization from './Organization';
import ActivityType from './types/ActivityType'
import User from './User';

export default interface Activity {
  _id: string;
  type: ActivityType;
  subject: string;
  date: Date;
  hasStartTime: boolean;
  duration: number;
  note: string;
  assignedTo: string | User;
  lead: string;
  participants?: string[] | Contact[];
  organization?: string | Organization;
  done: boolean;
  createdBy: string | User;
  lastEditor: string | User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedLeadActivity {
  _id: string;
  type: ActivityType;
  subject: string;
  date: Date;
  hasStartTime: boolean;
  duration: number;
  note: string;
  assignedTo: string | User;
  lead: Lead;
  participants?: string[] | Contact[];
  organization?: string | Organization;
  done: boolean;
  createdBy: string | User;
  lastEditor: string | User;
  createdAt: Date;
  updatedAt: Date;
}

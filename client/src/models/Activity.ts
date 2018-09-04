import Contact from "./Contact";
import Lead from "./Lead";
import Organization from "./Organization";
import User from "./User";
import { ActivityTypes } from "./utils/ActivityTypes"

export default interface Activity {
  type: ActivityTypes;
  subject: string;
  date: Date;
  hasStartTime: boolean;
  duration: number;
  note: string;
  assignedTo: string | User,
  lead: string | Lead;
  participants:  Contact[] | string[];
  organization: string | Organization;
  done: boolean;
  createdBy: string | User;
  lastEditor: string | User;
  createdAt: Date;
  updatedAt: Date;
}
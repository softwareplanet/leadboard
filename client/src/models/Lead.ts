import Contact from './Contact';
import CustomField from './CustomField';
import Note from './Note';
import Organization from './Organization';
import Stage from './Stage';
import Status from './types/Status';
import User from './User';

export default interface Lead {
  _id: string;
  stage: Stage;
  owner: User;
  visibility: number;
  name: string;
  order: number;
  contact: Contact;
  organization: Organization;
  custom: CustomField[];
  timestamp: Date;
  status: Status;
  notes: Note[];
}

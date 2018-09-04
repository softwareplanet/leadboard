import Stage from "./Stage";
import User from "./User";
import Contact from "./Contact";
import Organization from "./Organization";
import Custom from "./Custom";
import Status from "./Status";
import Note from "./Note";

export default interface Lead {
  _id: string;
  stage: string | Stage;
  owner: string | User;
  visibility: number;
  name: string;
  order: number;
  contact: string | Contact;
  organization: string | Organization;
  custom: string[] | Custom[];
  timestamp: Date;
  status: Status;
  notes: Note[];
}

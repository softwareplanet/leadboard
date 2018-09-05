import Domain from './Domain';

export default interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  domain: Domain;
  timestamp: Date;
  avatar: string;
}

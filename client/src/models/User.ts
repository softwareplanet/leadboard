export default interface User {
  _id: string,
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  domain: string;
  timestamp: Date;
  avatar:string;
}
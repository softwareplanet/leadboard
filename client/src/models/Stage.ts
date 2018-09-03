import Funnel from "./Funnel";

export default interface Stage {
   _id: string;
  funnel: string | Funnel;
  name: string;
  order: number;
  timestamp: Date;
}

import Funnel from './Funnel';

export default interface Stage {
   _id: string;
  funnel: string;
  name: string;
  order: number;
  timestamp: Date;
}

export interface FullStage {
  _id: string;
  funnel: Funnel;
  name: string;
  order: number;
  timestamp: Date;
}
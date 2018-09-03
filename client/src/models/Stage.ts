import Funnel from "./Funnel";

export default class Stage {
  public _id: string;
  public funnel: string | Funnel;
  public name: string;
  public order: number;
  public timestamp: Date;
}

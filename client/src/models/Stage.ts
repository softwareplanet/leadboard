import Funnel from "./Funnel";

export default class Stage {
  public _id: string;
  public funnel: Funnel;
  public name: string;
  public order: number;
  public timestamp: Date;
}
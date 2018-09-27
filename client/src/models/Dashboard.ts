import Activity from './Activity';
import Stage from './Stage';
import Lead from './Lead';
import Funnel from './Funnel';

export default interface Dashboard {
  funnels: Funnel[];
  loading: boolean;
  activeFunnel: Funnel;
  stages: Stage[];
  leads: string[];
  editLead: Lead;
  activities: Activity[];
}

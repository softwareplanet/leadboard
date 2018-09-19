import 'jsdom-global/register';
import { noop } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { ACTIVE, NOACTIVITY, OVERDUE, PLANNED } from './activityStatuses';
import ConnectedDashboard from './Dashboard';
import { Dashboard } from './Dashboard';
import * as styles from './Dashboard.css';
import Lead from './Lead/Lead';

let store;
const mockStore = configureStore();

describe('DASHBOARD component', () => {
  let leads = {
    funnels: [{ _id: '5b6b0fbe91e0774579ed6700', name: 'renkonazbkafunnel', domain: '5b6ab060f60c0524980fa23b' }],
    leads: {
      _5b6b123391e0774579ed6701: {
        leads: [
          { _id: '3456465474h5j', name: 'Lead' },
          { _id: '3456465474h5', name: 'Lead2' },
          { _id: '3456465474j', name: 'Lead3' },
          { _id: '3456465474hr2334', name: 'Lead4' },
          { _id: '34564653424235t', name: 'Lead5' },
          { _id: '2131342432424', name: 'Lead6' }
        ],
      },
    },
    stages: [
      { _id: '5b6b123391e0774579ed6701', funnel: '5b6b0fbe91e0774579ed6700', name: 'Stage 1', order: 1 },
      { _id: '5b6b123391e0774579ed6702', funnel: '5b6b0fbe91e0774579ed6700', name: 'Stage 2', order: 1 },
      { _id: '5b6b123391e0774579ed6703', funnel: '5b6b0fbe91e0774579ed6700', name: 'Stage 3', order: 1 },
      { _id: '5b6b123391e0774579ed6704', funnel: '5b6b0fbe91e0774579ed6700', name: 'Stage 4', order: 1 },
    ],
  };

  const activities = [
    { lead: '3456465474h5j', date: moment().add(2,'day') },
    { lead: '3456465474h5', date: moment().endOf('day') },
    { lead: '3456465474j', date: moment().subtract(2, 'day') },
    { lead: '3456465474hr2334', date: moment().subtract(2,'hour') },
    { lead: '34564653424235t', date: moment().add(2,'hour') }
  ];

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Dashboard
      loadLeadboard={noop}
      loadFirstActivityInLeadsPlan={noop}
      dashboard={leads}
      nearestActivities={activities}
    />);
  });

  it('check if user have at least one lead in stage, it should be rendered small tag with count of leads in stage', () => {
    expect(wrapper.find('small')).toHaveLength(1);
  });

  it('check if user have at least one lead in stage, in small tag count of leads is equal count of leads in props ', () => {
    const expectedCountOfLeads = leads.leads._5b6b123391e0774579ed6701.leads.length.toString();
    expect(wrapper.find('small').text()[0]).toEqual(expectedCountOfLeads);
  });

  it('check if user have leads in stages it should been rendered Lead components', () => {
    expect(wrapper.find(Lead)).toHaveLength(6);
  });

  it('check if lead have planned activity', () => {
    expect(wrapper.find(Lead).at(0).props().activityStatus).toEqual(PLANNED);
  });

  it('check if lead have active activity', () => {
    expect(wrapper.find(Lead).at(1).props().activityStatus).toEqual(ACTIVE);
  });

  it('check if lead have overdue activity', () => {
    expect(wrapper.find(Lead).at(2).props().activityStatus).toEqual(OVERDUE);
  });

  it('check if lead have overdue today activity with planed time', () => {
    expect(wrapper.find(Lead).at(3).props().activityStatus).toEqual(OVERDUE);
  });

  it('check if lead have planed today activity with planed time', () => {
    expect(wrapper.find(Lead).at(4).props().activityStatus).toEqual(ACTIVE);
  });

  it('check if lead have no activities', () => {
    expect(wrapper.find(Lead).at(5).props().activityStatus).toEqual(NOACTIVITY);
  });

  it('check if user don\'t have lead component it should been rendered a funnel by invocation createEmptyLeadCards method', () => {
    leads = { ...leads, leads: { _5b6b123391e0774579ed6701: { leads: [] } } };
    wrapper = shallow(<Dashboard
      loadLeadboard={noop}
      loadFirstActivityInLeadsPlan={noop}
      dashboard={leads}
      nearestActivities={activities}
    />);
    const stages = leads.stages.length;
    const expectedCountOfPlaceholders = ((stages + 1) / 2) * stages;
    expect(wrapper.find(`.${styles.stagePlaceholder}`)).toHaveLength(expectedCountOfPlaceholders);
  });
});

describe('Connected DASHBOARD (SMART component)', () => {
  let container: any;
  const initState = {
    errors: {},
    leads: {},
  };

  beforeEach(() => {
    store = mockStore(initState);
    container = shallow(<Provider store={store}><ConnectedDashboard /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(container.find(ConnectedDashboard)).toHaveLength(1);
  });
});

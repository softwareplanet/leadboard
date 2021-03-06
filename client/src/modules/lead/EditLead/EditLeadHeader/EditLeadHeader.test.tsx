import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import { IN_PROGRESS, LOST } from '../../../../constants';
import Lead from '../../../../models/Lead';
import { EditLeadHeader } from './EditLeadHeader';
import * as styles from './EditLeadHeader.css';

const editLead: Lead = {
  _id: '5b9110616ec37621e6b17bc4',
  contact: {
    _id: '5b9110616ec37621e6b17bc5',
    custom: [{
      _id: '5b9110616ec37621e6b17bc7',
      key: 'Phone',
      value: '',
    },
      {
        _id: '5b9110616ec37621e6b17bc6',
        key: 'Email',
        value: '',
      }],
      domain: '5b7ea5997adb5755f6bbc02b',
      name: 'Sarah',
    timestamp: new Date('2018-09-06T11:32:49.518Z'),
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain: '5b7ea5997adb5755f6bbc02b',
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
  },
  custom: [],
  name: 'Sarah lead',
  notes: [],
  order: 1,
  organization: {
    _id: '5b7ea6477adb5755f6bbc038',
    custom: [{
      _id: '5b7ea6477adb5755f6bbc039',
      key: 'Address',
      value: '',
    }],
    domain: '5b7ea5997adb5755f6bbc02b',
    name: 'Microsoft ',
    timestamp: new Date('2018-08-23T12:19:19.758Z'),
    owner: {
      _id: '5b86a96eed17641891c5011c',
      domain: '5b7ea5997adb5755f6bbc02b',
      email: 'olegsamardak98@gmail.com',
      firstname: 'John',
      lastname: 'Smith',
      timestamp: new Date('2018-08-29T14:10:54.392Z'),
    },
  },
  owner: {
    _id: '5b86a96eed17641891c5011c',
    domain: '5b7ea5997adb5755f6bbc02b',
    email: 'olegsamardak98@gmail.com',
    firstname: 'John',
    lastname: 'Smith',
    timestamp: new Date('2018-08-29T14:10:54.392Z'),
  },
  stage: {
    _id: '5b86a96eed17641891c50120',
    funnel: '5b86a96eed17641891c5011d',
    name: 'Decision',
    order: 3,
    timestamp: new Date('2018-08-29T14:10:54.395Z'),
  },
  status: IN_PROGRESS,
  timestamp: new Date('2018-09-06T11:32:49.547Z'),
};

describe('<EditLeadHeader />', () => {
  let updateLead;
  let deleteLead;
  const match = {
    params: {
      leadId: '5b86aa21ed17641891c50127',
    },
  };
  let loadActivities = jest.fn();

  it('should call updateLead after won and lost buttons click', () => {
    updateLead = jest.fn();
    deleteLead = jest.fn();
    const wrapper = shallow
    (
      <EditLeadHeader
        loadStagesWithoutLeads={jest.fn()}
        funnels={[]}
        loadFunnels={jest.fn()}
        match={match}
        editLead={editLead}
        updateLead={updateLead}
        deleteLead={deleteLead}
        loadActivities={loadActivities}
      />,
    );
    wrapper.find(`.${styles.button}`).simulate('click');
    wrapper.find(`.${styles.buttonLost}`).simulate('click');
    expect(updateLead).toHaveBeenCalledTimes(2);
  });

  it('should display closed lead actions if status is won or lost', () => {
    updateLead = jest.fn();
    deleteLead = jest.fn();
    loadActivities = jest.fn();
    editLead.status = LOST;
    const wrapper = shallow
    (
      <EditLeadHeader
        loadStagesWithoutLeads={jest.fn()}
        funnels={[]}
        match={match}
        loadFunnels={jest.fn()}
        editLead={editLead}
        updateLead={updateLead}
        deleteLead={deleteLead}
        loadActivities={loadActivities}
      />,
    );
    const closedLeadActions = wrapper.find(`.${styles.closedLeadActions}`);
    expect(closedLeadActions).toHaveLength(1);
  });
});

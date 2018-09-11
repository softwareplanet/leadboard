import { shallow } from 'enzyme';
import 'jsdom-global/register';
import * as React from 'react';
import Lead from '../../../../models/Lead';
import { EditLeadHeader } from './EditLeadHeader';
import * as styles from './EditLeadHeader.css';
import { LOST, IN_PROGRESS } from '../../../../constants';

let editLead: Lead = {
  _id: '5b9110616ec37621e6b17bc4',
  owner: {
    _id: '5b86a96eed17641891c5011c',
    email: 'olegsamardak98@gmail.com',
    domain: '5b86a96eed17641891c5011b',
    timestamp: new Date('2018-08-29T14:10:54.392Z'),
    lastname: 'Smith',
    firstname: 'John',
  },
  stage: {
    _id: '5b86a96eed17641891c50120',
    name: 'Decision',
    funnel: '5b86a96eed17641891c5011d',
    order: 3,
    timestamp: new Date('2018-08-29T14:10:54.395Z'),
  },
  name: 'Sarah lead',
  order: 1,
  contact: {
    _id: '5b9110616ec37621e6b17bc5',
    name: 'Sarah',
    domain: {
      _id: '5b86a96eed17641891c5011b',
      name: 'interLink',
      timestamp: new Date('2018-08-29T14:10:54.395Z'),
    },
    timestamp: new Date('2018-09-06T11:32:49.518Z'),
    custom: [{
      key: 'Phone',
      value: '',
      _id: '5b9110616ec37621e6b17bc7',
    },
      {
        key: 'Email',
        value: '',
        _id: '5b9110616ec37621e6b17bc6',
      }],
  },
  organization: {
    _id: '5b7ea6477adb5755f6bbc038',
    domain: '5b7ea5997adb5755f6bbc02b',
    name: 'Microsoft ',
    timestamp: new Date('2018-08-23T12:19:19.758Z'),
    custom: [{
      key: 'Address',
      value: '',
      _id: '5b7ea6477adb5755f6bbc039',
    }],
  },
  notes: [],
  status: IN_PROGRESS,
  timestamp: new Date('2018-09-06T11:32:49.547Z'),
  custom: [],
};

describe('<EditLeadHeader />', () => {
  let updateLead;
  const match = {
    params: {
      leadId: '5b86aa21ed17641891c50127',
    },
  };
  let loadLeadActivities;

  it('should call updateLead after won and lost buttons click', () => {
    updateLead = jest.fn();
    loadLeadActivities = jest.fn();
    const wrapper = shallow(
      <EditLeadHeader
        match={match}
        editLead={editLead}
        updateLead={updateLead}
        loadLeadActivities={loadLeadActivities}
      />,
    );
    wrapper.find(`.${styles.button}`).simulate('click');
    wrapper.find(`.${styles.buttonLost}`).simulate('click');
    expect(updateLead).toHaveBeenCalledTimes(2);
  });

  it('should display closed lead actions if status is won or lost', () => {
    updateLead = jest.fn();
    loadLeadActivities = jest.fn();
    editLead.status = LOST;
    const wrapper = shallow(
      <EditLeadHeader
        match={match}
        editLead={editLead}
        updateLead={updateLead}
        loadLeadActivities={loadLeadActivities}
      />,
    );
    const closedLeadActions = wrapper.find(`.${styles.closedLeadActions}`);
    expect(closedLeadActions).toHaveLength(1);
  });
});

import { shallow } from 'enzyme';
import * as React from 'react';
import Contact from '../../../models/Contact';
import Organization from '../../../models/Organization';
import DetailedViewHeader from './DetailedViewHeader';
import * as styles from './DetailedViewHeader.css';

const organization: Organization = {
  _id: '5b97a9aeb35f5710b39e3953',
  custom: [
    { _id: '5b97a9aeb35f5710b39e3951', key: '5b97a9aeb35f5710b39e3952', value: '25th av. 1' },
  ],
  domain: '5b86a96eed17641891c5011b',
  name: 'Testing Inc',
  timestamp: new Date(),
  owner: {
    _id: '5b86a96eed17641891c5011c',
    domain: '5b86a96eed17641891c5011c',
    email: 'olegsamardak98@gmail.com',
    firstname: 'John',
    lastname: 'Smith',
    timestamp: new Date('2018-08-29T14:10:54.392Z'),
  },
};

const contact: Contact = {
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
};

describe('<DetailedViewHeader />', () => {
  it('should render correct name in header for contact and organization', () => {
    let wrapper = shallow(<DetailedViewHeader model={organization} modelType="Organization" />);
    expect(wrapper.find(`.${styles.name}`).text()).toEqual('Testing Inc');
    wrapper = shallow(<DetailedViewHeader model={contact} modelType="Contact" />);
    expect(wrapper.find(`.${styles.name}`).text()).toEqual('Sarah');
  });
});

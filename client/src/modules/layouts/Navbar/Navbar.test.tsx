import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import * as React from 'react';
import Funnel from '../../../models/Funnel';
import { Navbar } from './Navbar';

configure({ adapter: new ReactSixteenAdapter });

describe('<Navbar /> :', () => {
  let wrapper;
  const activeFunnel: Funnel = {
    _id: '5ba09fc5cbf5106e2d6758f6',
    domain: '5ba09fc5cbf5106e2d6758f4',
    name: 'Funnel1',
    timestamp: new Date(),
  };
  let location: any = {};
  const history: any = {};
  const match: any = {};
  const auth: any = {};

  location = {
    pathname: '/home',
  };

  it('should render NavBar', () => {
    wrapper = shallow
    (
      <Navbar
        activeFunnel={activeFunnel}
        location={location}
        history={history}
        match={match}
        auth={auth}
        logoutUser={jest.fn()}
      />,
    );
    expect(wrapper.find('header').exists()).toBe(true);
  });
});

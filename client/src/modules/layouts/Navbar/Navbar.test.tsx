import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import * as React from 'react';
import { Navbar } from './Navbar';

configure({ adapter: new ReactSixteenAdapter });

describe('<Navbar /> :', () => {
  let wrapper;
  let location:any = {};
  const history:any = {};
  const match:any = {};

  location = {
    pathname: '/home',
  };

  it('should render NavBar', () => {
    wrapper = shallow(<Navbar location={location} history={history} match={match}/>);
    expect(wrapper.find('header').exists()).toBe(true);
  });
});

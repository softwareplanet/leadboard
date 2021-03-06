import { configure, shallow } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import * as React from 'react';
import { UserDropDown } from './UserDropDown';

configure({ adapter: new ReactSixteenAdapter });

describe('<UserDropDown /> :', () => {
  let wrapper;
  let logoutUser;
  let location: any = {};
  const history: any = {};
  const match: any = {};

  const auth = {
    domainName: 'Test domain',
    domainid: '5b6a9cca9a32282c3e8435c4',
    isAuthenticated: true,
    userName: 'John Doe',
    userid: '5b6a9cca9a32282c3e8435c5',
  };

  location = {
    pathname: '/home',
  };

  it('should call method logoutUser user when Logout clicked', () => {
    logoutUser = jest.fn();
    wrapper = shallow(
      <UserDropDown
        location={location}
        history={history}
        auth={auth}
        logoutUser={logoutUser}
        match={match}
      />);
    wrapper.find('#logout').simulate('click');
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});

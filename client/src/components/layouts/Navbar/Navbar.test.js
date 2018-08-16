import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Navbar } from  './Navbar'
import { MemoryRouter } from "react-router-dom";

configure({adapter: new Adapter});

describe('<Navbar /> :', () => {
    let wrapper;
    let logoutUser;

    let auth = {
      isAuthenticated: true,
      userid: '5b6a9cca9a32282c3e8435c5',
      domainid: '5b6a9cca9a32282c3e8435c4',
      userName: 'John Doye',
      domainName: 'Microsoft'
    };

    let location = {
        pathname: "/home"
    };

    it('should call method logoutUser user when Logout clicked', () => {
        logoutUser = jest.fn();
        wrapper = shallow(<Navbar location={location} auth={auth} logoutUser={logoutUser} />);
        wrapper.find('li')
            .filterWhere(li => {
                return li.find('div')
                    .filterWhere(div =>
                        div.prop('children').indexOf('Logout') !== -1).exists();
            })
            .forEach(li => {li.simulate('click')});
        expect(logoutUser).toHaveBeenCalledTimes(1);
    });


});

import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from  './Navbar'

configure({adapter: new Adapter});

describe('<Navbar /> :', () => {
    let wrapper;
    let logoutUser;

    it('should call method logoutUser user when Logout clicked', () => {
        logoutUser = jest.fn();
        wrapper = shallow(<Navbar logoutUser={logoutUser} />);
        console.log(wrapper.html());
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

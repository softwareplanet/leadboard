import React from "react";
import { configure } from 'enzyme';
import Login from "../auth/Login"
import Adapter from 'enzyme-adapter-react-16';
import { shallow,mount } from 'enzyme';


configure({adapter: new Adapter()});

describe("Login",() =>{
it('should render login form',()=>{
 let  container = shallow(<Login />
  expect(container.find('.test').text()).toEqual('asd');
})
});

import React from "react";
import styles from "./Navbar.css";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navbar } from  "./Navbar";

configure({ adapter: new Adapter });

describe("<Navbar /> :", () => {
  let wrapper;
  let logoutUser;

  let auth = {
    isAuthenticated: true,
    userid: "5b6a9cca9a32282c3e8435c5",
    domainid: "5b6a9cca9a32282c3e8435c4",
    userName: "John Doye",
    domainName: "Microsoft"
  };

  let location = {
    pathname: "/home"
  };

  it("should call method logoutUser user when Logout clicked", () => {
    logoutUser = jest.fn();
    wrapper = shallow(<Navbar location={location} auth={auth} logoutUser={logoutUser}/>);
    wrapper.find("#logout").simulate("click");
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });

  it("should change class to active if current pass equal to elements path value ", () => {
    wrapper = shallow(<Navbar auth={auth} location={location} logoutUser={logoutUser}/>);
    expect(wrapper.find("#deals").first().hasClass(styles.active)).toBeTruthy();
  })
});

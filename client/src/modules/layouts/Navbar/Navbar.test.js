import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navbar } from "./Navbar";

configure({ adapter: new Adapter });

describe("<Navbar /> :", () => {
  let wrapper;
  let logoutUser;
  let clearLeads;

  let auth = {
    isAuthenticated: true,
    userid: "5b6a9cca9a32282c3e8435c5",
    domainid: "5b6a9cca9a32282c3e8435c4",
    userName: "John Doe",
    domainName: "Test domain",
  };

  let location = {
    pathname: "/home",
  };

  it("should call method logoutUser user when Logout clicked", () => {
    logoutUser = jest.fn();
    clearLeads = jest.fn();
    wrapper = shallow(<Navbar clearLeads={clearLeads} location={location} auth={auth} logoutUser={logoutUser} />);
    wrapper.find("#logout").simulate("click");
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import MainField from "./MainField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<MainField/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "Apple"
    }
  };
  let wrapper;

  it("render MainField component", () => {
    wrapper = shallow(<MainField value={contact} />);
    expect(wrapper.length).to.equal(1);
  });

  it("should render correct contact name with props", () => {
    wrapper = shallow(<MainField value={contact} />);
    expect(wrapper.find("a.mainValue").children().text()).to.equal(contact.name);
  });

  it("should render correct organization name with props", () => {
    wrapper = shallow(<MainField value={contact.organization} />);
    expect(wrapper.find("a.mainValue").children().text()).to.equal(contact.organization.name);
  });

});
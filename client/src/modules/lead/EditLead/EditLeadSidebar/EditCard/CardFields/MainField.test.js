import React from "react";
import MainField from "./MainField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<MainField/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "RedDog Inc"
    }
  };
  let wrapper;

  it("render MainField component", () => {
    wrapper = shallow(<MainField value={contact} />);
    expect(wrapper.exists()).to.equal(true);
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

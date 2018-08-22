import React from "react";
import MainField from "./MainField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<MainField/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "red cat inc"
    }
  };
  let wrapper;

  it("render MainField component", () => {
    wrapper = shallow(<MainField name={contact.name} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("should render correct contact name with props", () => {
    wrapper = shallow(<MainField name={contact.name} />);
    expect(wrapper.find("a.mainValue").text()).to.equal(contact.name);
  });

  it("should render correct organization name with props", () => {
    wrapper = shallow(<MainField name={contact.organization.name} />);
    expect(wrapper.find("a.mainValue").children().text()).to.equal(contact.organization.name);
  });

});

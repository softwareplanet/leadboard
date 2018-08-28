import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Lead from "./Lead";
import profile from "../../../../img/profile.svg";


configure({ adapter: new Adapter });

describe("<Lead /> :", () => {
  let wrapper;
  let lead = {
    _id: "5b6c598084412364d01a73b4",
    name: "Test lead",
    owner: {},
    contact: {
      name: "Test contact name",
    },
    organization: {
      name: "Test organization name",
    },
  };

  let link = `/funnel/5b6bd8112e46b819428f9b52/lead/5b6c598084412364d01a73b4`;

  beforeEach(() => {
    wrapper = shallow(<Lead lead={lead} link={link} />);
  });

  it("should render default avatar if domain owner avatar is absent", () => {
    expect(wrapper.find("img").map((node) => node.prop("src")).some(prop => prop === profile)).toBeTruthy();
  });

  it("should render organization name if contact person is absent", () => {
    let leadWithoutContact = { ...lead };
    delete leadWithoutContact.contact;
    wrapper = shallow(<Lead link={link} lead={leadWithoutContact} />);
    expect(wrapper.find("small").text()).toEqual(leadWithoutContact.organization.name);
  });

});

import React from "react";
import CardField from "./CardField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<CardField/>", () => {
  let field = { name: "Phone", value: "+380930527927" };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField field={field} />);
  });

  it("render CardField component", () => {
    expect(wrapper.exists()).to.equal(true);
  });

  it("render correct props", () => {
    expect(wrapper.find("span.customFieldLabel").text()).to.equal(field.name);
    expect(wrapper.find("span.customFieldValue").text()).to.equal(field.value);
  });

  it("render add value link if value is empty", () => {
    field = { name: "Phone", value: "" };
    wrapper = shallow(<CardField field={field} />);
      expect(wrapper.find("span.addValue").length).to.equal(1);
  })
});

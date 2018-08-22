import React from "react";
import { CardField } from "./CardField";
import { expect } from "chai";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";


describe("<CardField/>", () => {
  let field = { name: "Phone", value: "+380930527927" };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField customFieldValue={field.value} customFieldName={field.name} />);
  });

  it("render CardField component", () => {
    expect(wrapper.exists()).to.equal(true);
  });

  it("render correct props", () => {
    expect(wrapper.find("span.customFieldLabel").text()).to.equal(field.name);
    expect(wrapper.find("span.customFieldValue").find("Link").children().text()).to.equal(field.value);
  });

  it("render add value link if value is empty", () => {
    field = { name: "Phone", value: "" };
    wrapper = shallow(<CardField customFieldValue={field.value} customFieldName={field.name} />);
      expect(wrapper.find("span.addValue").length).to.equal(1);
  })
});

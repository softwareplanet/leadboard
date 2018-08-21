import React from "react";
import CardField from "./CardField";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";


describe("<CardField/>", () => {
  let custom = [{ name: "Phone", value: "+380930527927" }];
  // customFieldValue={Object.values(field)[1]} customFieldName={Object.values(field)[0]}
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField customFieldValue={custom[0].value} customFieldName={custom[0].name} />);
  });

  it("render CardField component", () => {
    expect(wrapper.length).to.equal(1);
  });

  it("render correct props", () => {
    expect(wrapper.find("span.customFieldLabel").text()).to.equal(custom[0].name);
    expect(wrapper.find("span.customFieldValue").find("Link").children().text()).to.equal(custom[0].value);
  })

  it("render add value link if value is empty", () => {
    custom = [{ name: "Phone", value: "" }];
    wrapper = shallow(<CardField customFieldValue={custom[0].value} customFieldName={custom[0].name} />);
    if (custom[0].value === "") {
      expect(wrapper.find("span.addValue").length).to.equal(1);
    }
  })

});
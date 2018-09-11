import React from "react";
import CardField from "./CardField";
import { expect } from "chai";
import { shallow } from "enzyme";
import { noop } from "lodash";

describe("<CardField/>", () => {
  let field = { key: "Phone", value: "+380930527927" };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField field={field} onUpdate={noop} />);
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
    wrapper = shallow(<CardField field={field} onUpdate={noop} />);
    expect(wrapper.find("span.addValue").length).to.equal(1);
  });
});

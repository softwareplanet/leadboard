import React from "react";
import CardField from "./CardField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<CardField/>", () => {
  const fieldName = "Phone";
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField fieldName={fieldName} />);
  });

  it("render CardField component", () => {
    expect(wrapper.length).to.equal(1);
  });

  it("render correct props", () => {
    expect(wrapper.find("div.fieldLabel").children().text()).to.equal(fieldName);
  })

});
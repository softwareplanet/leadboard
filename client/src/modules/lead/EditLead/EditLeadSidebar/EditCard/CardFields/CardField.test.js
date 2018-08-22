import React from "react";
import { CardField } from "./CardField";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<CardField/>", () => {
  const fieldName = "Phone";
  const fieldValue = "+3801234567";
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardField
      customFieldName={fieldName}
      customFieldValue={fieldValue}
    />);
  });

  it("render CardField component", () => {
    expect(wrapper.length).to.equal(1);
  });

  it("render correct props", () => {
    expect(wrapper.find(".customFieldLabel").text()).to.equal(fieldName);
    expect(wrapper.find(".customFieldValue").text()).to.equal(fieldValue);
  });

});
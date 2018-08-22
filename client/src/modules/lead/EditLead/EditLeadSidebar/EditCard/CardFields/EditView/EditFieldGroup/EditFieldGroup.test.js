import "jsdom-global/register";
import React from "react";
import styles from "./EditFieldGroup.css";
import EditFieldGroup from "./EditFieldGroup";
import { mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

const customField = {
  name: "Address",
  value: "Grushevskoho st.",
};

describe("EditFieldGroup", () => {
  it("renders without crashing", function() {
    const fieldGroupWrapper = mount(<EditFieldGroup/>);
    expect(fieldGroupWrapper.find("input").hasClass(styles.input)).to.equal(true);
  });

  it("renders props", function() {
    const fieldGroupWrapper = mount(<EditFieldGroup
      name={customField.name}
      value={customField.value}
    />);
    expect(fieldGroupWrapper.find("span").text()).to.equal(customField.name);
    expect(fieldGroupWrapper.find("input").props().defaultValue).to.equal(customField.value);
  });

  it("reacts correctly on change", function() {
    let handleChange = sinon.spy();
    const fieldGroupWrapper = mount(<EditFieldGroup name={customField.name}
                                                    value={customField.value}
                                                    onChange={handleChange}/>);
    const input = fieldGroupWrapper.find("input");
    const newValue = "Gogolya st.";
    input.simulate("change", { target: { value: newValue } });
    expect(handleChange.calledOnce).to.equal(true);
  });
});

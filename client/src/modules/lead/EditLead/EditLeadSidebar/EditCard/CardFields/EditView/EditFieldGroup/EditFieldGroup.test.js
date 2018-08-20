import "jsdom-global/register";
import React from "react";
import styles from "./EditFieldGroup.css";
import EditFieldGroup from "./EditFieldGroup";
import { mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

describe("EditFieldGroup", () => {
  it("renders without crashing", function() {
    const fieldGroupWrapper = mount(<EditFieldGroup/>);
    expect(fieldGroupWrapper.find("input").hasClass(styles.input)).to.equal(true);
  });

  it("reacts correctly on change", function() {
    const name = "Address";
    const value = "Grushevskoho st.";

    let handleChange=sinon.spy();

    const fieldGroupWrapper = mount(<EditFieldGroup name={name} value={value} onChange={handleChange}/>);
    const input = fieldGroupWrapper.find("input");
    const newValue = "Gogolya st.";
    input.simulate("change", { target: { value: newValue } });
    expect(handleChange.calledOnce).to.equal(true);
  });

});

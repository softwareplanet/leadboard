import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import InputGroup from "./InputGroup";
import InputField from "@material-ui/core/TextField";

describe("<InputGroup/>", () => {
  function onChange() {
  }

  let inputGroup;
  beforeEach(() => {
    inputGroup = shallow(<InputGroup name="email" onChange={onChange} value={""} error={"error"}/>);
  });

  it("render without crashing", () => {
    expect(inputGroup.find(InputField)).to.have.length(1);
  });

  it("show error message if contains error in props", () => {
    expect(inputGroup.find(".invalid-feedback")).to.have.length(1);
  });
});
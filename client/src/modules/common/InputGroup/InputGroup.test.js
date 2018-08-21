import "jsdom-global/register";
import React from "react";
import chai from "chai";
import spies from "chai-spies";
import InputGroup from "./InputGroup";
import { createMount } from "@material-ui/core/test-utils";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

chai.use(spies);
const expect = chai.expect;
describe("<InputGroup/>", () => {

  function onChange() {

  }

  const spy = chai.spy(onChange());
  let inputGroup;
  let mount;
  beforeEach(() => {
    mount = createMount();
    inputGroup = mount(
      <InputGroup name="email" onChange={spy} value={""} error={"error"}/>
    );
  });

  it("render without crashing", () => {
    expect(inputGroup.html()).to.exist;
  });

  it("should call method onChange on input some data in field", () => {
    let input = inputGroup.find(".MuiInput-input-30");
    input.simulate("change", { target: { value: "test" } });
    expect(spy).to.have.been.called.once;
  });

  it("show error message if contains error in props", () => {
    let message = inputGroup.find(FormHelperText);
    expect(message.text()).to.equal("error")
  });
});
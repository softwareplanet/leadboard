import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import EditLeadFieldPopover from "./EditLeadFieldPopover";

describe("<EditLeadPopup />", () => {
  it("should change state after input", () => {
    let wrapper = shallow(<EditLeadFieldPopover />);
    let input = wrapper.find("input");
    input.simulate("change", { target: { value: "Google" } });
    expect(wrapper.state().value).to.be.equal("Google");
  });
});

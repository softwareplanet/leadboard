import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import EditLeadPopover from "./EditLeadPopover";

describe("<EditLeadPopup />", () => {
  it("should change state after input", () => {
    let wrapper = shallow(<EditLeadPopover />);
    let input = wrapper.find("input");
    input.simulate("change", { target: { value: "Google" } });
    expect(wrapper.state().name).to.be.equal("Google");
  });
});

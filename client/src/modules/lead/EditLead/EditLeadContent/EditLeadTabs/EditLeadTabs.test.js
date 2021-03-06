import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { EditLeadTabs } from "./EditLeadTabs"

describe("<EditLeadTabs/>", () => {
  
  let wrapper;

  it("render EditLeadSidebar component", () => {
    wrapper = shallow(<EditLeadTabs />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("render fake input", () => {
    wrapper = shallow(<EditLeadTabs />);
    expect(wrapper.find("div.fakeInput").exists()).to.equal(true);
  });
});

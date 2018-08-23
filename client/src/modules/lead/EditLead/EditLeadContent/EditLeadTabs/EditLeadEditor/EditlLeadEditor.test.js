import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import EditLeadEditor from "./EditLeadEditor";
import styles from "./EditLeadEditor.css"

describe("<EditLeadEditor />", () => {
  it("should change state after input", () => {
    let wrapper = shallow(<EditLeadEditor />);
    let textarea = wrapper.find("textarea");
    textarea.simulate("change", { target: { value: "Note" } });
    expect(wrapper.state().noteText).to.be.equal("Note");
  });

  it("should clear editor after cancel", () => {
    let wrapper = shallow(<EditLeadEditor />);
    let textarea = wrapper.find("textarea");
    let cancelButton = wrapper.findWhere(node => node.hasClass(styles.button));
    cancelButton.simulate("click");
    expect(textarea.props().value).to.be.equal("");
  });
});

import "jsdom-global/register";
import React from "react";
import MainField from "./MainField";
import { expect } from "chai";
import { shallow } from "enzyme";
import sinon from "sinon";

describe("<MainField/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "Testing Inc",
    },
  };
  let wrapper;

  it("render MainField component", () => {
    wrapper = shallow(<MainField value={contact.name} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("should render correct contact name with props", () => {
    wrapper = shallow(<MainField value={contact.name} />);
    expect(wrapper.find("span.mainValue").children().text()).to.equal(contact.name);
  });

  it("should render correct organization name with props", () => {
    wrapper = shallow(<MainField value={contact.organization.name} />);
    expect(wrapper.find("span.mainValue").children().text()).to.equal(contact.organization.name);
  });

  it("should switch to edit view on click Rename", () => {
    wrapper = shallow(<MainField value={contact.organization.name} />);
    const buttonRename = wrapper.find(".buttonRename");
    buttonRename.simulate("click");
    expect(wrapper.state().isInEditMode).to.equal(true);
  });

  it("should handle name change properly", () => {
    const spy = sinon.spy();
    wrapper = shallow(<MainField value={contact.organization.name} onUpdate={spy} />);
    const buttonRename = wrapper.find("button.buttonRename");
    buttonRename.simulate("click");
    expect(wrapper.state().isInEditMode).to.equal(true);

    const nameEditView = wrapper.find("SingleEditView");
    nameEditView.simulate("change", "Name", "Microsoft");
    expect(wrapper.state().isInEditMode).to.equal(false);
  });

});


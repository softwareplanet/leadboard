import "jsdom-global/register";
import React from "react";
import { MainField } from "./MainField";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
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
    wrapper = shallow(<MainField field={contact} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("should render correct contact name with props", () => {
    wrapper = shallow(<MainField field={contact} />);
    expect(wrapper.find("a.mainValue").children().text()).to.equal(contact.name);
  });

  it("should render correct organization name with props", () => {
    wrapper = shallow(<MainField field={contact.organization} />);
    expect(wrapper.find("a.mainValue").children().text()).to.equal(contact.organization.name);
  });

  it("should switch to edit view on click Rename", () => {
    wrapper = mount(<MainField field={contact.organization}/>);
    const buttonRename = wrapper.find(".buttonRename");
    buttonRename.simulate("click");
    expect(wrapper.state().isInEditMode).to.equal(true);
  });

  it("should handle name change properly", () => {
    const spy = sinon.spy();
    wrapper = shallow(<MainField field={contact.organization} updateOrganization={spy}/>);
    const buttonRename = wrapper.find(".buttonRename");
    buttonRename.simulate("click");
    expect(wrapper.state().isInEditMode).to.equal(true);

    const nameEditView = wrapper.find("SingleEditView");
    nameEditView.simulate("change", "Name", "Microsoft");
    expect(wrapper.state().isInEditMode).to.equal(false);
  });

});

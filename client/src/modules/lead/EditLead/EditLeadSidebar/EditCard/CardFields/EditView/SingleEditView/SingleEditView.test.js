import "jsdom-global/register";
import React from "react";
import SingleEditView from "./SingleEditView";
import { expect } from "chai";
import { shallow } from "enzyme";
import sinon from "sinon";
import { noop } from "lodash";

describe("<SingleEditView/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "Testing Inc",
    },
  };
  let wrapper;

  it("renders without crashing", () => {
    wrapper = shallow(<SingleEditView
      fieldName={"Name"}
      fieldValue={contact.organization.name}
      onCancel={noop} />);
    expect(wrapper.length).to.equal(1);
  });

  it("reacts on cancel properly", () => {
    const spy = sinon.spy();
    wrapper = shallow(<SingleEditView
      fieldName={"Name"}
      fieldValue={contact.organization.name}
      onCancel={spy}/>);
    const buttonCancel = wrapper.find(".cancelButton");
    buttonCancel.simulate("click");
    expect(spy.calledOnce).to.equal(true);
  });

  it("handles input change and save properly", () => {
    const spy = sinon.spy();
    wrapper = shallow(<SingleEditView
      fieldName={"Name"}
      fieldValue={contact.organization.name}
      onChange={spy}
      onCancel={noop} />,
    );
    const inputGroup = wrapper.find("EditFieldGroup");
    inputGroup.simulate("change");

    const buttonSave = wrapper.find(".saveButton");
    buttonSave.simulate("click");
    expect(spy.calledOnce).to.equal(true);
  });
});
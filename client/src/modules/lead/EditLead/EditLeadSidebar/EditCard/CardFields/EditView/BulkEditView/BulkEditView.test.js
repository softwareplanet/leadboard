import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme/build/index";
import BulkEditView from "./BulkEditView";
import sinon from "sinon";
import { noop } from "lodash";

describe("<BulkEditView/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "Testing Inc",
      custom: [
        { name: "Address", value: "25th av. 1" },
      ],
    },
  };
  let wrapper;

  it("renders without crashing", () => {
    wrapper = shallow(<BulkEditView
      model={contact.organization}
      onCancel={noop} />);
    expect(wrapper.length).to.equal(1);
    expect(wrapper.state().custom[0].value).to.equal(contact.organization.custom[0].value);
  });

  it("reacts on cancel properly", () => {
    const spy = sinon.spy();
    wrapper = shallow(<BulkEditView
      model={contact.organization}
      onCancel={spy} />);
    const buttonCancel = wrapper.find(".button");
    buttonCancel.simulate("click");
    expect(spy.calledOnce).to.equal(true);
  });

  it("handles input change and save", () => {
    const spy = sinon.spy();
    wrapper = shallow(<BulkEditView
      model={contact.organization}
      onChange={spy}
      onCancel={noop} />,
    );
    const inputGroup = wrapper.find({ name: "Address" });
    const newAddress = "Shevchenka st. 123";
    inputGroup.simulate("change", "Address", newAddress);

    const buttonSave = wrapper.find(".saveBtn");
    buttonSave.simulate("click");
    expect(spy.calledOnce).to.equal(true);
    expect(wrapper.state().custom[0].value).to.equal(newAddress);
  });
});
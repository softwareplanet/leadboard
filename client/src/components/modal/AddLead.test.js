import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import AddLead from "./AddLead";
import store from "../../store";
import Modal from "react-modal";

Modal.setAppElement("body");

describe("<AddLead />", () => {
  it("renders without crashing", () => {
    let mountedAddLead = mount(<AddLead store={store}/>);
    expect(mountedAddLead).to.have.length(1);
  });

  it("shows validation", () => {
    let mountedAddLead = mount(<AddLead store={store}/>);

    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    const invalidContainerClass ="AppLead__input-container--invalid";
    const containerClass = "AppLead__input-container";

    expect(mountedAddLead.find(`.${containerClass}`).length).to.equal(3);

    mountedAddLead.setState({
      validationIsShown: true,
      errors: {
        contact: "Contact is invalid"
      }
    }, () => {
      expect(mountedAddLead.find(`.${containerClass}`).get(0).props.className)
        .to.include(invalidContainerClass);
    });

    mountedAddLead.setState({
      validationIsShown: true,
      errors: {
        organization: "Organization is invalid"
      }
    }, () => {
      expect(mountedAddLead.find(`.${containerClass}`).get(1).props.className)
        .to.include(invalidContainerClass);
    });

    mountedAddLead.setState({
      validationIsShown: true,
      errors: {
        name: "Name is invalid"
      }
    }, () => {
      expect(mountedAddLead.find(`.${containerClass}`).get(2).props.className)
        .to.include(invalidContainerClass);
    });

  });
});


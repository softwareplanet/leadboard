import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import AddLead from "./AddLead";
import store from "../../../store";
import Modal from "react-modal";
import styles from "./AddLead.css";
import sinon from "sinon";

Modal.setAppElement("body");

describe("<AddLead />", () => {
  it("renders without crashing", () => {
    let mountedAddLead = mount(<AddLead store={store}/>);
    expect(mountedAddLead).to.have.length(1);
  });

  it("shows proper amount of inputs", () => {
    let mountedAddLead = mount(<AddLead store={store}/>);

    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    const containerClass = styles.inputContainer;
    expect(mountedAddLead.find(`.${containerClass}`).length).to.equal(3);
  });
});



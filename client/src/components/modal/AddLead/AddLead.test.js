import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import AddLead from "./AddLead";
import store from "../../../store";
import Modal from "react-modal";
import styles from "./AddLead.css";

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

  it("shows validation when necessary", () => {
    let mountedAddLead = mount(<AddLead store={store}/>);
    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    const invalidContainerClass = styles.invalidContainer;

    let saveLeadBtn = mountedAddLead.find(`.${styles.saveBtn}`);
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(3);

    let contactInput = mountedAddLead.find("[name='contact']");
    contactInput.simulate("change", {target: {name: "contact", value: "Bob"}});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(1);

    let nameInput = mountedAddLead.find("[name='name']");
    nameInput.simulate("change", {target: {name: "name", value: "Deal with Bob"}});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(0);
  });
});



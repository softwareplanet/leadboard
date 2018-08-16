import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import SelectStageOnCreation from "./SelectStageOnCreation";
import store from "../../../../store";
import styles from "./SelectStageOnCreation.css";

describe("<SelectStageOnCreation />", () => {
  let mountedSelectStageOnCreation;
  const stages = [{ _id: 1, name: "interest" }, { _id: 2, name: "promoting" }, { _id: 3, name: "action" }];
  beforeEach(() => {
    mountedSelectStageOnCreation = mount(<SelectStageOnCreation stages={stages} store={store} />);
  });

  it("renders without crashing", () => {
    expect(mountedSelectStageOnCreation).to.have.length(1);
  });

  it("shows proper amount of stages", () => {
    const stageClass = styles.radio;
    expect(mountedSelectStageOnCreation.find(`.${stageClass}`).length).to.equal(
      mountedSelectStageOnCreation.props().stages.length
    );
  });

  it("first stages active by default", () => {
    const stageClass = styles.radio;
    console.log(mountedSelectStageOnCreation.html());
    expect(mountedSelectStageOnCreation.find(`.${stageClass}`).at(0))
      .hasClass(styles.active)
      .equal(true);
  });

  // it("shows validation when necessary", () => {
  //   let mountedAddLead = mount(<AddLead store={store} />);
  //   let openModalBtn = mountedAddLead.find("button");
  //   openModalBtn.simulate("click", {});

  //   const invalidContainerClass = styles.invalidContainer;
  //   expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(0);

  //   let saveLeadBtn = mountedAddLead.find(`.${styles.saveBtn}`);
  //   saveLeadBtn.simulate("click", {});
  //   expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(3);

  //   let contactInput = mountedAddLead.find("[name='contact']");
  //   contactInput.simulate("change", { target: { name: "contact", value: "Bob" } });
  //   expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(1);

  //   let nameInput = mountedAddLead.find("[name='name']");
  //   nameInput.simulate("change", { target: { name: "name", value: "Deal with Bob" } });
  //   expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(0);
  // });
});

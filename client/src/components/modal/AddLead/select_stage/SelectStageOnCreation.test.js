import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import SelectStageOnCreation from "./SelectStageOnCreation";
import store from "../../../../store";
import styles from "./SelectStageOnCreation.css";

describe("<SelectStageOnCreation />", () => {
  let wrapper;
  let onStageChange = jest.fn();
  const stages = [{ _id: 1, name: "interest" }, { _id: 2, name: "promoting" }, { _id: 3, name: "action" }];
  beforeEach(() => {
    wrapper = mount(<SelectStageOnCreation stages={stages} onStageChange={onStageChange} />);
  });

  it("renders without crashing", () => {
    expect(wrapper).to.have.length(1);
  });

  it("shows proper amount of stages", () => {
    const stageClass = styles.radio;
    console.log(wrapper.props().stages);
    expect(wrapper.find(`.${stageClass}`).length).to.equal(wrapper.props().stages.length);
  });

  it("first stages active by default", () => {
    const stageClass = styles.radio;
    console.log(wrapper.html());
    expect(
      wrapper
        .find(`.${stageClass}`)
        .at(0)
        .hasClass(styles.active)
    ).equal(true);
  });
});

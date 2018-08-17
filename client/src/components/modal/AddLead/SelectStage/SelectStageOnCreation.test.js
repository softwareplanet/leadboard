import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import SelectStageOnCreation from "./SelectStageOnCreation";
import styles from "./SelectStageOnCreation.css";

describe("<SelectStageOnCreation />", () => {
  let wrapper;
  const onStageChange = jest.fn();
  const stages = [{ _id: 1, name: "interest" }, { _id: 2, name: "promoting" }, { _id: 3, name: "action" }];
  beforeEach(() => {
    wrapper = mount(<SelectStageOnCreation stages={stages} onStageChange={onStageChange} />);
  });

  it("renders without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("shows proper amount of stages", () => {
    const stageClass = styles.radio;
    expect(wrapper.find(`.${stageClass}`).length).toEqual(wrapper.props().stages.length);
  });

  it("selects first stages active by default", () => {
    const stageClass = styles.radio;
    expect(
      wrapper
        .find(`.${stageClass}`)
        .at(0)
        .hasClass(styles.active)
    ).toEqual(true);
  });

  it("checks if function that select the stage was triggered on stage click", () => {
    wrapper
      .find("[type='radio']")
      .at(2)
      .simulate("click", {});
    expect(onStageChange).toHaveBeenCalled();
  });

  it("checks if function that add active class to stage works", () => {
    const stageClass = styles.radio;
    wrapper
      .find("[type='radio']")
      .at(2)
      .simulate("click", {});
    wrapper.update();
    expect(
      wrapper
        .find(`.${stageClass}`)
        .at(2)
        .render()
        .hasClass(styles.active)
    ).toEqual(true);
  });
});

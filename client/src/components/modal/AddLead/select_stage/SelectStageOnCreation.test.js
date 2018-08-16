import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";

import SelectStageOnCreation from "./SelectStageOnCreation";
import styles from "./SelectStageOnCreation.css";
import { wrap } from "module";
import classNames from "classnames";

describe("<SelectStageOnCreation />", () => {
  let wrapper;
  const onStageChange = jest.fn();
  let activateStageStyle;
  const stages = [{ _id: 1, name: "interest" }, { _id: 2, name: "promoting" }, { _id: 3, name: "action" }];
  beforeEach(() => {
    wrapper = mount(<SelectStageOnCreation stages={stages} onStageChange={onStageChange} />);
    activateStageStyle = wrapper.instance().activateStageStyle;
  });

  it("renders without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("shows proper amount of stages", () => {
    const stageClass = styles.radio;
    expect(wrapper.find(`.${stageClass}`).length).toEqual(wrapper.props().stages.length);
  });

  it("first stages active by default", () => {
    const stageClass = styles.radio;
    expect(
      wrapper
        .find(`.${stageClass}`)
        .at(0)
        .hasClass(styles.active)
    ).toEqual(true);
  });

  it("click on stage trigger function that select the stage", () => {
    wrapper
      .find("[type='radio']")
      .at(2)
      .simulate("click", {});
    expect(onStageChange).toHaveBeenCalled();
  });

  it("click on stage trigger function that add active class to stage", () => {
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

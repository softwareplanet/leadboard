import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import Activity from "./Activity";
import styles from "./Activity.css";
import moment from "moment";
import { updateActivity } from "../activityActions";

describe("<Activity/>", () => {
  let wrapper;
  let activity;
  beforeEach(() => {
    activity = {
      _id:"5b87ebc6c1b90d0a041891ba",
      duration:30,
      assignedTo:"5b8536ab546b434ac55dbeb7",
      lead:"5b8536d3546b434ac55dbec2",
      updatedAt:"2018-08-30T13:06:14.987Z",
      createdAt:"2018-08-30T13:06:14.987Z",
      done:false,
      participants:[],
      note:"",
      hasStartTime:true,
      date:moment(),
      subject:"Call Dinis",
      type:"Call",
      __v:0,
    };
    wrapper = shallow(<Activity activity={activity}/>);
  });

  it("should render Activity component", () => {
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find(`.${styles.activityWrapper}`).getContent).to.equal("Call Dinis");
  });

  it("should render Activity date with styles.expiredTime", () => {
    activity.date = moment().add(-1,"days");
    expect(wrapper.find(`${styles.expiredTime}`).exists()).to.equal(true);
  });

  it("should render Activity  datewith styles.default", () => {
    expect(wrapper.find(`${styles.defaultTime}`).exists()).to.equal(true);
  });

  it("should render Activity date with styles.today", () => {
    activity.hasStartTime = false;
    expect(wrapper.find(`${styles.today}`).exists()).to.equal(true);
  });

  it("should render Activity date with styles.default", () => {
    activity.done = true;
    expect(wrapper.find(`${styles.defaultTime}`).exists()).to.equal(true);
  });

  it("should render Activity checkBox with styles.markedAsNotDone", () => {
    expect(wrapper.find(`${styles.markedAsNotDone}`).exist()).to.equal(true);
  });

  it("should render Activity checkBox with styles.markedAsDone", () => {
    activity.done = true;
    expect(wrapper.find(`${styles.markedAsDone}`).exist()).to.equal(true);
  });

  it("should exec updateActivity method", () => {
    let checkBox = wrapper.find(`${styles.markedAsNotDone}`);
    checkBox.simulate("click");
    expect(updateActivity.toHaveBeenCalled().once());
  });
});

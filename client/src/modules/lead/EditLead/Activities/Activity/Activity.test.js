import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Activity from "./Activity";
import styles from "./Activity.css";
import moment from "moment";

describe("<Activity/>", () => {
  let activity;
  beforeEach(() => {
    activity = {
      _id: "5b87ebc6c1b90d0a041891ba",
      duration: 30,
      assignedTo: "5b8536ab546b434ac55dbeb7",
      lead: "5b8536d3546b434ac55dbec2",
      updatedAt: "2018-08-30T13:06:14.987Z",
      createdAt: "2018-08-30T13:06:14.987Z",
      done: false,
      participants: [],
      note: "",
      hasStartTime: true,
      date: moment(),
      subject: "Call Dinis",
      type: "Call",
      __v: 0,
    };

  });

  it("should render Activity component", () => {
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("should render Activity date with styles.expiredTime", () => {
    activity.date = moment().add(-1, "days");
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.expiredTime}`).exists()).to.equal(true);
  });

  it("should render Activity  date with styles.default", () => {
    activity.date = moment().add(10, "days");
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.defaultTime}`).exists()).to.equal(true);
  });

  it("should render Activity date with styles.today", () => {
    activity.hasStartTime = false;
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.today}`).exists()).to.equal(true);
  });

  it("should render Activity date with styles.default", () => {
    activity.done = true;
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.defaultTime}`).exists()).to.equal(true);
  });

  it("should render Activity checkBox with styles.markedAsNotDone", () => {
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.markedAsNotDone}`).exists()).to.equal(true);
  });

  it("should render Activity checkBox with styles.markedAsDone", () => {
    activity.done = true;
    let wrapper = mount(<Activity activity={activity} />);
    expect(wrapper.find(`.${styles.markedAsDone}`).exists()).to.equal(true);
  });
});

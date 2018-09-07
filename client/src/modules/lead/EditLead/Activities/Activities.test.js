import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import Activities from "./Activities";
import styles from "./Activities.css";

describe("<Activity/>", () => {
  let activities;
  beforeEach(() => {
    activities = [
      {
        _id: "5b87ebc6c1b90d0a041891ba",
        duration: 30,
        assignedTo: "5b8536ab546b434ac55dbeb7",
        lead: "5b8536d3546b434ac55dbec2",
        updatedAt: "2018-08-30T13:06:14.987Z",
        createdAt: "2018-08-30T13:06:14.987Z",
        done: true,
        participants: [],
        note: "",
        hasStartTime: true,
        date: new Date(),
        subject: "Call Dinis",
        type: "Call",
        __v: 0,
      },
      {
        _id: "5b87ebc6c1b90d0a041881ba",
        duration: 30,
        assignedTo: "5b8536ab546b434ac55dbeb7",
        lead: "5b8536d3546b434ac55dbec2",
        updatedAt: "2018-08-30T13:06:14.987Z",
        createdAt: "2018-08-30T13:06:14.987Z",
        done: false,
        participants: [],
        note: "",
        hasStartTime: true,
        date: new Date(),
        subject: "Call Dinis",
        type: "Call",
        __v: 0,
      },
    ];
  });

  it("should render Activities component", () => {
    let wrapper = shallow(<Activities done={false} activities={activities} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("should render timeLine with pastTimeLineBar styles", () => {
    let wrapper = shallow(<Activities done={true} activities={activities} />);
    expect(wrapper.find(`.${styles.pastTimeLineBar}`).exists()).to.equal(true);
  });

  it("should render timeLine with plannedTimeLineBar styles", () => {
    let wrapper = shallow(<Activities done={false} activities={activities} />);
    expect(wrapper.find(`.${styles.plannedTimeLineBar}`).exists()).to.equal(true);
  });

  it("should render 2 Activity component", () => {
    let wrapper = shallow(<Activities done={false} activities={activities} />);
    expect(wrapper.find("InfoItemWrapper")).to.have.length(2);
  });

  it("should not render timeLineBar", () => {
    let wrapper = shallow(<Activities done={false} activities={[]} />);
    expect(wrapper.find(`.${styles.plannedTimeLineBar}`).exists()).to.equal(false);
    expect(wrapper.find(`.${styles.pastTimeLineBar}`).exists()).to.equal(false);
  });

  it("should render noActivities message", () => {
    let wrapper = shallow(<Activities done={false} activities={[]} />);
    expect(wrapper.find(`.${styles.noActivitiesMessage}`).exists()).to.equal(true);
  });
});

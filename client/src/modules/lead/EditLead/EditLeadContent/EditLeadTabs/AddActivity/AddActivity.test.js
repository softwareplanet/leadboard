import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import AddActivity from "./AddActivity";
import { configure } from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";

configure({ adapter: new Adapter() });


describe("<AddActivity />", () => {

  let onActivitySaveMock;
  let wrapper;

  beforeEach(() => {
    onActivitySaveMock = jest.fn().mockImplementation(activity => activity);
    wrapper = shallow(<AddActivity onSave={onActivitySaveMock} onCancel={() => jest.fn()} />);
  });

  it("it should return activity with default values if nothing picked", () => {
    wrapper.find("#saveActivityButton").simulate("click");
    expect(onActivitySaveMock.mock.calls[0][0])
      .toMatchObject({ type: "Call", subject: "Call", date: moment().startOf("day")._d });
  });

  it("it should return activity with correct values due to picked", () => {
    let onActivitySaveMock = jest.fn().mockImplementation(activity => activity);
    let wrapper = shallow(<AddActivity onSave={onActivitySaveMock} onCancel={() => jest.fn()} />);

    let state = {
      activeTab: "Meeting",
      subject: "Meeting test",
      date: moment().startOf("day").add(1, "day"),
      time: moment().startOf("day").add(1, "hours"),
      duration: 60,
    };

    wrapper.setState(state);
    wrapper.find("#saveActivityButton").simulate("click");

    expect(onActivitySaveMock.mock.calls[0][0])
      .toMatchObject({
        date: state.date.add(1, "hours")._d,
        duration: state.duration,
        hasStartTime: true,
        subject: state.subject,
        type: state.activeTab,
      });
  });

  it("it should load correct state on edit", () => {
    const activity = {
      _id: "5b895a431270f10f86eb26b8",
      duration: 60,
      lead: "5b893533b1e18b6782dbab4f",
      assignedTo: "5b7adf5182b8de5b65fc1b8c",
      createdBy: "5b7adf5182b8de5b65fc1b8c",
      __v: 0,
      lastEditor: "5b7adf5182b8de5b65fc1b8c",
      updatedAt: "2018-09-04T13:16:33.116Z",
      createdAt: "2018-08-31T15:09:55.797Z",
      done: false,
      participants: [],
      note: "",
      hasStartTime: true,
      date: "2018-09-09T21:30:00.000Z",
      subject: "Meet Alice",
      type: "Meeting",
    };

    const expectedState = {
      activeTab: activity.type,
      duration: activity.duration,
      subject: activity.subject,
    };

    const wrapper = shallow(<AddActivity onSave={onActivitySaveMock} onCancel={() => jest.fn()} activity={activity} />);
    expect(wrapper.state()).toMatchObject(expectedState);
  });
});

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
    wrapper = shallow(<AddActivity onSave={onActivitySaveMock} onCancel={() => jest.fn()}/>);
  });


  it("it should return activity with default values if nothing picked", () => {
    wrapper.find("#saveActivityButton").simulate("click");
    expect(onActivitySaveMock.mock.calls[0][0])
      .toMatchObject({ type: 'Call', subject: 'Call', date: Date.parse(moment().startOf("day")._d) });
  });

  it("it should return activity with correct values due to picked", () => {
    let onActivitySaveMock = jest.fn().mockImplementation(activity => activity);
    let wrapper = shallow(<AddActivity onSave={onActivitySaveMock} onCancel={() => jest.fn()}/>);

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
          date: Date.parse(state.date.add(1, "hours")),
          duration: state.duration,
          hasStartTime: true,
          subject: state.subject,
          type: state.activeTab
      });
  });

});

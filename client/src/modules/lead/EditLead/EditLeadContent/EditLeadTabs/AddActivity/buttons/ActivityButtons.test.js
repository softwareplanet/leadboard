import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16";
import ActivityButtons from "./ActivityButtons";
import phoneIcon from "../../../../../../../assets/img/add-activity/phone.svg";
import meetingIcon from "../../../../../../../assets/img/add-activity/meeting.svg";
import ButtonWithImg from "./ButtonWithImg";


configure({ adapter: new Adapter() });


describe("<ActivityButtons />", () => {

  const activityTypes = [
    {type: "Call", icon: phoneIcon},
    {type: "Meeting", icon: meetingIcon},
  ];
  let wrapper;
  let onButtonClick;

  beforeEach(() => {
    onButtonClick = jest.fn().mockImplementation(activity => activity);
    wrapper = shallow(<ActivityButtons
      buttons={activityTypes}
      onButtonClick={onButtonClick}/>);
  });

  it("it should render amount of buttons equal to buttons array", () => {
    expect(wrapper.find(ButtonWithImg)).toHaveLength(activityTypes.length)
  });

});

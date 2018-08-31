import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import { EditLeadHeader } from "./EditLeadHeader";
import styles from "./EditLeadHeader.css";
import { LOST } from "../../../../constants";
const editLead = {
  _id: "5b86aa21ed17641891c50127",
  owner: "5b6a9a31d4b6b82050ab6c18",
  stage: {
    funnel: "5b6bffe7902bb52dbf8c6aec",
    name: "Interested",
    order: 2,
    timestamp: "2018-08-09T11:19:34.042Z",
    __v: 0,
    _id: "5b6c2346ba02fb4d861710ec"
  },
  name: "Microsoft",
  order: 1,
  timestamp: "2018-08-09T08:50:45.397Z",
  custom: [],
  __v: 0,
  status: LOST
};

describe("<EditLeadHeader />", () => {
  let loadLead;
  let updateLead;
  let match = {
    params: {
      leadId: "5b86aa21ed17641891c50127"
    }
  }
  it("should call updateLead after won and lost buttons click", () => {
    loadLead = jest.fn();
    updateLead = jest.fn();
    let wrapper = shallow(
    <EditLeadHeader 
      match={match}
      editLead={editLead} 
      loadLead={loadLead} 
      updateLead={updateLead}
    />
    )
    wrapper.find(`.${styles.button}`).simulate("click");
    wrapper.find(`.${styles.buttonLost}`).simulate("click");
    expect(updateLead).toHaveBeenCalledTimes(2);
  });
});

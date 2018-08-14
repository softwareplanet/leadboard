import "jsdom-global/register";
import React from "react";
import { EditLeadStageProgress } from "./EditLeadStageProgress";
import { shallow, mount } from "enzyme";
import EditLeadStage from "./EditLeadStage/EditLeadStage";
import store from "../../../../store";
import { expect } from "chai";
const stages = [
  {
    funnel: "5b6bff8b902bb52dbf8c6aeb",
    name: "In action",
    order: 3,
    timestamp: "2018-08-09T11:19:34.042Z",
    __v: 0,
    _id: "5b72930e0fb0902c268dbd0f"
  },
  {
    funnel: "5b6bffe7902bb52dbf8c6aec",
    name: "Interested",
    order: 2,
    timestamp: "2018-08-09T11:19:34.042Z",
    __v: 0,
    _id: "5b6c2346ba02fb4d861710ec"
  }
];

const editLead = {
  _id: "5b6c0065902bb52dbf8c6aed",
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
  status: "Lost"
};

const leads = {
  stages: stages,
  editLead: editLead
};

describe("<EditLeadStageProgress />", () => {
  it("should render 2 stages", () => {
    let wrapper = shallow(<EditLeadStageProgress leads={leads} />);
    expect(wrapper.find(EditLeadStage)).to.have.length(2);
  });

  it("should render 1 active stage from 2 stages", () => {
    let wrapper = shallow(<EditLeadStageProgress leads={leads} />);
    let activeStage = wrapper.findWhere(EditLeadStage => EditLeadStage.props().active);
    expect(activeStage).to.have.length(1);
  });

  it("should receive correct lead status", () => {
    let wrapper = shallow(<EditLeadStageProgress leads={leads} />);
    let activeStage = wrapper.findWhere(
      EditLeadStage => EditLeadStage.props().status === "Lost" && EditLeadStage.props().active
    );
    expect(activeStage).to.have.length(1);
  });
});

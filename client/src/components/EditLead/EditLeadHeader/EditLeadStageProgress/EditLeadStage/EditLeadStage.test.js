import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import EditLeadStage from "./EditLeadStage";
import { expect } from "chai";
import { LOST, IN_PROGRESS } from "../../../../../constants";
import styles from "./EditLeadStage.css";
const stage = {
  funnel: "5b6bff8b902bb52dbf8c6aeb",
  name: "In action",
  order: 3,
  timestamp: "2018-08-09T11:19:34.042Z",
  __v: 0,
  _id: "5b72930e0fb0902c268dbd0f"
};

describe("<EditLeadStage />", () => {
  it("should render component with class 'active' ", () => {
    let wrapper = shallow(
      <EditLeadStage
        onStageClick={null}
        active={true}
        status={IN_PROGRESS}
        stages={[1, 2]}
        stage={stage}
        isFirst={false}
      />
    );
    expect(wrapper.find(`.${styles.active}`)).to.have.length(1);
  });

  it("should render component without class 'active' ", () => {
    let wrapper = shallow(
      <EditLeadStage
        onStageClick={null}
        active={false}
        status={IN_PROGRESS}
        stages={[1, 2]}
        stage={stage}
        isFirst={false}
      />
    );
    expect(wrapper.find(`.${styles.active}`)).to.have.length(0);
  });

  it("should render component with class 'lost' ", () => {
    let wrapper = shallow(
      <EditLeadStage onStageClick={null} active={false} status={LOST} stages={[1, 2]} stage={stage} isFirst={false} />
    );
    expect(wrapper.find(`.${styles.lost}`)).to.have.length(1);
  });
});

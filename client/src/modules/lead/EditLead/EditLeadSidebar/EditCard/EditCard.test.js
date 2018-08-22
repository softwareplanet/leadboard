import React from "react";
import { EditCard } from "./EditCard";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<EditCard/>", () => {
  const contact = {
    name: "Bob",
    organization: {
      name: "Testing Inc",
      custom: [
        {
          name: "Address",
          value: "Saint street",

        },
      ],
    },
    custom: [
      {
        name: "Phone",
        value: "+3801234567",
      },
    ],
  };
  let wrapper;

  it("render EditCard component", () => {
    wrapper = shallow(<EditCard model={contact}/>);
    expect(wrapper.length).to.equal(1);
  });
});

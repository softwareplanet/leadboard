import React from "react";
import EditCard from "./EditCard";
import { expect } from "chai";
import { shallow } from "enzyme";
import CardField from "./CardFields/CardField";
import MainField from "./CardFields/MainField";

describe("<EditCard/>", () => {
  let contact = {
    name: "Bob",
    organization: {
      name: "red dog inc",
      custom: [
        {
          name: "Address", value: "Saint street"
        },
      ]
    },
    custom: [
      {
        name: "Phone", value: "+380974040018"
      },
      {
        name: "Email", value: "Bobdoe@gmail.com"
      }
    ]
  };

  let wrapper;

  it("render EditCard component", () => {
    wrapper = shallow(<EditCard value={contact} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("render MainField component", () => {
    wrapper = shallow(<EditCard value={contact} />);
    expect(wrapper.find(MainField).exists()).to.equal(true);
  });

  it("render correct quantity for CardFields component for Contact", () => {
    wrapper = shallow(<EditCard value={contact} />);
    wrapper.update();
    expect(wrapper.find(CardField).length).to.equal(2);
  });

  it("render correct quantity for CardFields component for Organization", () => {
    wrapper = shallow(<EditCard value={contact.organization} />);
    wrapper.update();
    expect(wrapper.find(CardField).length).to.equal(1);
  });

});

import React from "react";
import EditCard from "./EditCard";
import { expect } from "chai";
import { shallow} from "enzyme";

describe("<EditCard/>", () => {
    const contact = {
        name: "Bob",
        organization: {
            name: "Apple",
            custom: [
                {
                    Address: "Saint street"
                }
            ]
        },
        custom: [
            {
                Phone: "+380974040018"
            }
        ]
    };
    const title = "Person";
    let wrapper;

    it("render EditCard component", () => {
        wrapper = shallow(<EditCard value={contact}/>);
        expect(wrapper.length).to.equal(1);
    });
});

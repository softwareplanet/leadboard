import React from "react";
import CardField from "./CardField";
import { shallow } from "enzyme";

describe("<CardField/>", ()=> {
    const fieldName = "Phone";
    let wrapper;

    beforeEach(()=>{
       wrapper = shallow(<CardField fieldName={fieldName}/>);
    });

    it("render CardField component", ()=> {
        expect(wrapper.length).toEqual(1);
    });
});
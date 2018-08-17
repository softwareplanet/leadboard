import "jsdom-global/register";
import React from "react";
import styles from "EditFieldGroup.css";
import EditFieldGroup from "./EditFieldGroup";
import {mount} from "enzyme";

describe("EditFieldGroup",()=> {
  it("should render without crashing", function() {
    const fieldGroupWrapper = mount(<EditFieldGroup/>);
  });

});

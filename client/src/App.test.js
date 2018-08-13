import 'jsdom-global/register';
import React from "react";
import App from "./App";
import { mount, shallow } from "enzyme";

it("renders without crashing", () => {
  let app = shallow(<App/>);
  let mountedApp = mount(<App/>);
});

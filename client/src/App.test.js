import "jsdom-global/register";
import React from "react";
import App from "./App";
import { render } from "enzyme";
import { expect } from "chai";

it("renders without crashing", () => {
  let mountedApp = render(<App/>);
  expect(mountedApp).to.have.length(1);
});

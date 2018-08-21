import "jsdom-global/register";
import React from "react";
import Login from "./Login";
import store from "../../../store";
import { expect } from "chai";
import { createMount } from '@material-ui/core/test-utils'
import { MemoryRouter } from "react-router";
import InputGroup from "../../common/InputGroup/InputGroup";
import { Provider } from "react-redux";

describe("<Login/>", () => {
  let loginPage;
  let mount;
  beforeEach(() => {
    mount = createMount();
    loginPage = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      </Provider>
    );
  });

  it("mount two input fields", () => {
    expect(loginPage.find(InputGroup)).to.have.length(2);
  });
});





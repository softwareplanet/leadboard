import "jsdom-global/register";
import React from "react";
import Login from "./Login";
import store from "../../../store";
import { expect } from "chai";
import styles from "./Login.css";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import InputGroup from "../../common/InputGroup/InputGroup";
import { Provider } from "react-redux";

describe("<Login/>", () => {
  let loginPage;
  beforeEach(() => {
    loginPage = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      </Provider>
    );
  });

  it("mounted without crashing", () => {
    expect(loginPage).to.have.length(1);
  });

  it("mount two input fields", () => {
    expect(loginPage.find(InputGroup)).to.have.length(2);
  });
});





import "jsdom-global/register";
import React from "react";
import { EmptyCard } from "./EmptyCard";
import { expect } from "chai";
import { mount } from "enzyme";
import Modal from "react-modal";
import OrganizationAutocomplete from "../../../../../common/autocomplete/organization/OrganizationAutocomplete";
import styles from "../EditCard.css";

describe("<EmptyCard />", () => {
  let wrapper;
  Modal.setAppElement("body");

  const organizations = [
    { _id: "5b7c0c6e42b4cb4a2c72492d", domain: "5b6ab060f60c0524980fa23b", name: "Company 1" },
    { _id: "5b7c0cc542b4cb4a2c724933", domain: "5b6ab060f60c0524980fa23b", name: "Company 2" },
  ];

  const fakeEvent = {
    preventDefault: () => true,
  };

  beforeEach(() => {
    wrapper = mount(
      <EmptyCard
        id="organization-card"
        title="Organization"
        styles={{}}
        iTagClass={"className"}
        items={organizations}
      >
        <OrganizationAutocomplete />
      </EmptyCard>,
    );
  });

  it("renders without crashing", () => {
    expect(wrapper).to.have.length(1);
  });

  it("shows proper amount of inputs", () => {
    let openModalLink = wrapper.find("a");
    openModalLink.simulate("click", fakeEvent);
    expect(wrapper.find(`.${styles.inputContainer}`).length).to.equal(1);
  });

  it("after modal is opened, should return one disabled `Link an organization` button", () => {
    let openModalLink = wrapper.find("a");
    openModalLink.simulate("click", fakeEvent);
    expect(wrapper.find(`.${styles.disabledButton}`).length).to.equal(1);
  });

  it("after input is changed, should return one enabled `Link an organization` button", () => {
    let openModalLink = wrapper.find("a");
    openModalLink.simulate("click", fakeEvent);

    let input = wrapper.find(".organization-input");
    input.simulate("change", { target: { value: "Orion Company" } });
    input.simulate("blur", {});
    expect(wrapper.find(`.${styles.enableButton}`).length).to.equal(1);
  });

  it("after input is changed, should return an additional message", () => {
    let openModalLink = wrapper.find("a");
    openModalLink.simulate("click", fakeEvent);

    let input = wrapper.find(".organization-input");
    input.simulate("change", { target: { value: "Orion Company" } });
    input.simulate("blur", {});
    expect(wrapper.find(`.${styles.additionMessage}`).text()).to.equal(
      `A new organization (Orion Company) will be created and linked to this lead.`
    );
  });

  it("on organization input blur, NEW badge will be shown and clear button will NOT", () => {
    let openModalBtn = wrapper.find("a");
    openModalBtn.simulate("click", fakeEvent);

    let organizationAutocomplete = wrapper.find(".organization-input");
    organizationAutocomplete.simulate("change", {target: {value: "Company 3"}});
    organizationAutocomplete.simulate("blur", {});

    let organizationBadge = wrapper.find("#organization-badge");
    expect(organizationBadge.exists()).to.equal(true);
  });

  it("after modal is opened, should render clear button in input wrapper", () => {
    let openModalBtn = wrapper.find("a");
    openModalBtn.simulate("click", fakeEvent);

    let organizationClearBtn = wrapper.find(`.${styles.clearBtn}`);
    expect(organizationClearBtn.exists()).to.equal(true);
  });

});
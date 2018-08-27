import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import chai from "chai";
import spies from "chai-spies";

import { AddLead } from "./AddLead";
import Modal from "react-modal";
import configureStore from "redux-mock-store";
import styles from "./AddLead.css";

chai.use(spies);

let store;
const mockStore = configureStore();
Modal.setAppElement("body");

describe("<AddLead />", () => {
  const initialState = {};
  const spy = chai.spy(()=>{});

  beforeEach(() => {
    store = mockStore(initialState);
  });
  const organizations = [
    { _id: "5b7c0c6e42b4cb4a2c72492d", domain: "5b6ab060f60c0524980fa23b", name: "Company 1" },
    { _id: "5b7c0cc542b4cb4a2c724933", domain: "5b6ab060f60c0524980fa23b", name: "Company 2" },
  ];
  const auth = {
    isAuthenticated: true,
    userid: "5b6ab060f60c0524980fa23c",
    domainid: "5b6ab060f60c0524980fa23b"
  };
  let leads = {
    funnels: [{ _id: "5b6b0fbe91e0774579ed6700", name: "renkonazbkafunnel", domain: "5b6ab060f60c0524980fa23b" }],
    stages: [
      { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Awareness", order: 1 },
      { _id: "5b6b123391e0774579ed6702", funnel: "5b6b0fbe91e0774579ed6700", name: "Interest", order: 2 },
      { _id: "5b6b123391e0774579ed6703", funnel: "5b6b0fbe91e0774579ed6700", name: "Decision", order: 3 },
      { _id: "5b6b123391e0774579ed6704", funnel: "5b6b0fbe91e0774579ed6700", name: "Action", order: 4 }
    ],
    leads: {
      _5b6b123391e0774579ed6701: {
        leads: [
          { _id: "3456465474h5j", name: "Lead" },
          { _id: "3456465474h5", name: "Lead2" },
          { _id: "3456465474j", name: "Lead3" }
        ]
      }
    }
  };

  it("renders without crashing", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );
    expect(mountedAddLead).to.have.length(1);
  });

  it("shows proper amount of inputs", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadContacts={spy}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );

    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    const containerClass = styles.inputContainer;
    expect(mountedAddLead.find(`.${containerClass}`).length).to.equal(3);
  });

  it("shows validation when necessary", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadContacts={spy}
        createLead={spy}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );
    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    const invalidContainerClass = styles.invalidContainer;
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(0);

    let saveLeadBtn = mountedAddLead.find(`.${styles.saveBtn}`);
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(3);

    let contactInput = mountedAddLead.find(".contact-input");
    contactInput.simulate("change", { target: { value: "Bob" } });
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(1);

    let nameInput = mountedAddLead.find("[name='name']");
    nameInput.simulate("change", { target: { name: "name", value: "Deal with Bob" } });
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(0);
  });
  it("on organization input blur, lead title will change", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadContacts={spy}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );
    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    let organizationAutocomplete = mountedAddLead.find(".organization-input");
    organizationAutocomplete.simulate("change", {target: {value: "Company 3"}});
    expect(organizationAutocomplete.render().attr("value")).to.equal("Company 3");

    organizationAutocomplete.simulate("blur", {});
    let nameInput = mountedAddLead.find("[name='name']");
    expect(nameInput.render().attr("value")).to.equal("Company 3 lead");
  });

  it("on new organization input blur, showBadge will be true", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadContacts={spy}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );
    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    let organizationAutocomplete = mountedAddLead.find(".organization-input");
    organizationAutocomplete.simulate("change", {target: {value: "Company 3"}});
    organizationAutocomplete.simulate("blur", {});

    let organizationBadge = mountedAddLead.find("#organization-badge");
    expect(organizationBadge.exists()).to.equal(true);
  });

  it("on new organization input change, items menu will be shown", () => {
    let mountedAddLead = mount(
      <AddLead
        contacts={[]}
        loadContacts={spy}
        loadOrganizations={spy}
        organizations={organizations}
        auth={auth}
        store={store}
        leads={leads}
        errors={{}}
      />,
    );

    let openModalBtn = mountedAddLead.find("button");
    openModalBtn.simulate("click", {});

    let organizationAutocomplete = mountedAddLead.find(".organization-input");
    organizationAutocomplete.simulate("change", {target: {value: "Company 3"}});
    const renderMenu = mountedAddLead.findWhere(node => node.hasClass('renderMenu')).at(0);
    const renderMenuProps = renderMenu.props();
    const renderMenuChildrenObject = renderMenuProps.children;
    const renderMenuChildrenText = renderMenuChildrenObject.props.children;
    expect(renderMenu.exists()).to.equal(true);
    expect(renderMenuChildrenText).to.equal(`"Company 3" will be added as a new organization`);
  });
});
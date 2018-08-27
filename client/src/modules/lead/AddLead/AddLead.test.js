import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { AddLead } from "./AddLead";
import Modal from "react-modal";
import configureStore from "redux-mock-store";

import styles from "./AddLead.css";
import { loadOrganizations } from "./autocomplete/organization/organizationActions";
import { createLead } from "../leadActions";

let store;
const mockStore = configureStore();
Modal.setAppElement("body");

describe("<AddLead />", () => {
  const initialState = {};

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
      { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
      { _id: "5b6b123391e0774579ed6702", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
      { _id: "5b6b123391e0774579ed6703", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
      { _id: "5b6b123391e0774579ed6704", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 }
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
        loadOrganizations={loadOrganizations()}
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
        loadOrganizations={loadOrganizations()}
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
        createLead={createLead({})}
        loadOrganizations={loadOrganizations()}
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

    let contactInput = mountedAddLead.find("[name='contact']");
    contactInput.simulate("change", { target: { name: "contact", value: "Bob" } });
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(1);

    let nameInput = mountedAddLead.find("[name='name']");
    nameInput.simulate("change", { target: { name: "name", value: "Deal with Bob" } });
    saveLeadBtn.simulate("click", {});
    expect(mountedAddLead.find(`.${invalidContainerClass}`).length).to.equal(1);
  });

  it("on organization input blur, lead title will change", () => {
    let mountedAddLead = mount(
      <AddLead
        loadOrganizations={loadOrganizations(auth.domainid)}
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
    let organizationAutocomplete = mountedAddLead.find(`.${containerClass}`).find("[role='combobox']");
    organizationAutocomplete.simulate("change", {target: {value: "companay"}});
    expect(mountedAddLead.state().organization.name).to.equal("companay");

    organizationAutocomplete.simulate("blur", {});
    expect(mountedAddLead.state().name).to.equal(`${mountedAddLead.state().organization.name} lead`);
  });

  it("on new organization input blur, showBadge will be true", () => {
    let mountedAddLead = mount(
      <AddLead
        loadOrganizations={loadOrganizations(auth.domainid)}
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
    let organizationAutocomplete = mountedAddLead.find(`.${containerClass}`).find("[role='combobox']");
    organizationAutocomplete.simulate("change", {target: {value: "companay"}});
    expect(mountedAddLead.state().organization.name).to.equal("companay");

    organizationAutocomplete.simulate("blur", {});
    expect(mountedAddLead.state().showBadge).to.equal(true);
  });

  it("on new organization input change, items menu will be shown", () => {
    let mountedAddLead = mount(
      <AddLead
        loadOrganizations={loadOrganizations(auth.domainid)}
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
    let organizationAutocomplete = mountedAddLead.find(`.${containerClass}`).find("[role='combobox']");
    organizationAutocomplete.simulate("change", {target: {value: "companay"}});
    const renderMenu = mountedAddLead.findWhere(node => node.hasClass('renderMenu')).at(0);
    const renderMenuProps = renderMenu.props();
    const renderMenuChildrenObject = renderMenuProps.children;
    const renderMenuChildrenText = renderMenuChildrenObject.props.children;
    expect(renderMenu.exists()).to.equal(true);
    expect(renderMenuChildrenText).to.equal(`"${mountedAddLead.state().organization.name}" will be added as a new organization`);
  });
});

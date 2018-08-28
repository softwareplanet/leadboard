import "jsdom-global/register";
import React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import { EditLeadSidebar } from "./EditLeadSidebar";
import configureStore from "redux-mock-store";
import noop from "lodash";
import styles from "../EditLeadSidebar/EditCard/EditCard.css";

let store;
const mockStore = configureStore();

describe("<EditLeadSidebar/>", () => {
  let editLead = {
    contact: {
      _id: "5b7be33d41e06c0b72930acd",
      name: "John",
      domain: "5b7a69c07e53b4214177526e",
      __v: 0,
      organization: "5b7be33d41e06c0b72930acb",
      timestamp: "2018-08-21T10:02:37.985Z",
      custom: [
        {
          name: "Phone",
          value: "",
          _id: "5b7be33d41e06c0b72930acf",
        },
        {
          name: "Email",
          value: "",
          _id: "5b7be33d41e06c0b72930ace",
        },
      ],
    },
    organization: {
      _id: "5b7be33d41e06c0b72930acb",
      domain: "5b7a69c07e53b4214177526e",
      name: "RedDog Inc",
      __v: 0,
      timestamp: "2018-08-21T10:02:37.973Z",
      custom: [
        {
          name: "Address",
          value: "",
          _id: "5b7be33d41e06c0b72930acc",
        },
      ],
    },
  };

  const organizations = [
    { _id: "5b7c0c6e42b4cb4a2c72492d", domain: "5b6ab060f60c0524980fa23b", name: "Company 1" },
    { _id: "5b7c0cc542b4cb4a2c724933", domain: "5b6ab060f60c0524980fa23b", name: "Company 2" },
  ];
  const contacts = [
    { _id: "5b7eb55995019343c59b0c8c", domain: "5b6ab060f60c0524980fa23b", name: "Bob", organization: "5b7c0c6e42b4cb4a2c72492d" },
    { _id: "5b7eac4a6a0682428f35485e", domain: "5b6ab060f60c0524980fa23b", name: "Mike", organization: "5b7c0cc542b4cb4a2c724933" },
  ];

  const initialState = { leads: { editLead: editLead }, contacts: contacts, organizations: organizations };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  let wrapper;

  it("render EditLeadSidebar component", () => {
    wrapper = mount(<EditLeadSidebar
      loadLead={noop}
      editLead={editLead}
      loadContacts={noop}
      loadOrganizations={noop}
      contacts={contacts}
      organizations={organizations}
    />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("render correct EditCard quantity", () => {
    wrapper = mount(<EditLeadSidebar
      loadLead={noop}
      editLead={editLead}
      loadContacts={noop}
      loadOrganizations={noop}
      contacts={contacts}
      organizations={organizations}
    />);
    wrapper.update();
    expect(wrapper.find('EditCard').length).to.equal(2);
  });
});

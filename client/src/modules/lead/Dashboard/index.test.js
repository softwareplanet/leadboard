import React from "react";
import configureStore from "redux-mock-store";
import noop from "lodash";

import { shallow } from "enzyme";
import { Provider } from "react-redux";
import ConnectedDashboard from "./Dashboard";
import { Dashboard } from "./Dashboard";
import Lead from "./Lead/Lead";
import styles from "./Dashboard.css";

let store;
const mockStore = configureStore();

describe("DASHBOARD component", () => {
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
  const activities = [
    { lead: "5b8fc932d19421617725d41b", date: "2018-09-02 00:00:00.000", hasStartTime: false }
  ];

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard
      loadLeadboard={noop}
      loadFirstActivityInLeadsPlan={noop}
      auth={auth}
      leads={leads}
      activities={activities}
    />);
  });

  it("check if user have at least one lead in stage, it should be rendered small tag with count of leads in stage", () => {
    expect(wrapper.find("small")).toHaveLength(1);
  });

  it("check if user have at least one lead in stage, in small tag count of leads is equal count of leads in props ", () => {
    const expectedCountOfLeads = leads.leads._5b6b123391e0774579ed6701.leads.length.toString();
    expect(wrapper.find("small").text()[0]).toEqual(expectedCountOfLeads);
  });

  it("check if user have leads in stages it should been rendered Lead components", () => {
    expect(wrapper.find(Lead)).toHaveLength(3);
  });

  it("check if user don't have lead component it should been rendered a funnel by invocation createEmptyLeadCards method", () => {
    leads = { ...leads, leads: { _5b6b123391e0774579ed6701: { leads: [] } } };
    wrapper = shallow(<Dashboard
      loadLeadboard={noop}
      loadFirstActivityInLeadsPlan={noop}
      auth={auth}
      leads={leads}
      activities={activities}
    />);
    const stages = leads.stages.length;
    const expectedCountOfPlaceholders = ((stages + 1) / 2) * stages;
    expect(wrapper.find(`.${styles.stagePlaceholder}`)).toHaveLength(expectedCountOfPlaceholders);
  });
});

describe("Connected DASHBOARD (SMART component)", () => {
  let container;
  const initState = {
    leads: {},
    errors: {}
  };

  beforeEach(() => {
    store = mockStore(initState);
    container = shallow(<Provider store={store}><ConnectedDashboard/></Provider>);
  });

  it("render the connected(SMART) component", () => {
    expect(container.find(ConnectedDashboard)).toHaveLength(1);
  });
});

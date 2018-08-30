import React from "react";
import configureStore from "redux-mock-store";
import { loadLeadboardAction, loadStagesAction, loadLeadsAction } from "../leadActions";
import * as types from "../types";
import reducer from "../leadReducersAggregator";

import { shallow } from "enzyme";

import { Provider } from "react-redux";
import ConnectedDashboard from "./Dashboard";
import { Dashboard } from "./Dashboard";
import { loadLeadboard } from "../leadActions";
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

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard loadLeadboard={loadLeadboard(auth.domainid)} auth={auth} leads={leads} />);
  });

  it("check if user have at least one lead in stage, it should be rendered small tag with count of leads in stage", () => {
    expect(wrapper.find("small").length).toEqual(1);
  });

  it("check if user have at least one lead in stage, in small tag count of leads is equal count of leads in props ", () => {
    const expectedCountOfLeads = leads.leads._5b6b123391e0774579ed6701.leads.length.toString();
    expect(wrapper.find("small").text()[0]).toEqual(expectedCountOfLeads);
  });

  it("check if user have leads int stages it should been rendered Lead modules", () => {
    const expectedCountOfLeads = leads.leads._5b6b123391e0774579ed6701.leads.length;
    expect(wrapper.find(Lead).length).toEqual(expectedCountOfLeads);
  });

  it("check if user don't have lead component it should been rendered a funnel by invocation createEmptyLeadCards method", () => {
    leads = { ...leads, leads: { _5b6b123391e0774579ed6701: { leads: [] } } };
    wrapper = shallow(<Dashboard loadLeadboard={loadLeadboard(auth.domainid)} auth={auth} leads={leads} />);
    const stages = leads.stages.length;
    const expectedCountOfPlaceholders = ((stages + 1) / 2) * stages;
    expect(wrapper.find(`.${styles.stagePlaceholder}`).length).toEqual(expectedCountOfPlaceholders);
  });
});

describe("Actions", () => {
  const initialState = {};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("check leadboards actions on dispatching", () => {
    let actions;
    const domainId = "5b6ab060f60c0524980fa23b";
    const funnelId = "5b6b0fbe91e0774579ed6700";
    const stageId = "5b6b123391e0774579ed6701";

    store.dispatch(loadLeadboardAction(domainId));
    store.dispatch(loadStagesAction(funnelId));
    store.dispatch(loadLeadsAction(stageId, {}));

    actions = store.getActions();
    expect(actions[0].type).toBe("LOAD_LEADBOARD");
    expect(actions[1].type).toBe("LOAD_STAGES");
    expect(actions[2].type).toBe("LOAD_LEADS");
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
    expect(container.find(ConnectedDashboard).length).toEqual(1);
  });
});

describe("LEADBOARD REDUCERS", () => {
  it("should handle LOAD_LEADS action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_LEADS,
        stage: "5b6b123391e0774579ed6701",
        payload: {
          _id: "5b72871c12928e2150a87daf",
          name: "Test lead",
          owner: "5b6ab060f60c0524980fa23c",
          stage: "5b6b123391e0774579ed6701",
          timestamp: "2018-08-14T07:39:08.346Z"
        }
      })
    ).toEqual({
      funnels:[],
      stages:[],
      editLead:{
        lead:{},
      },
      leads: {
        _5b6b123391e0774579ed6701: {
          leads: {
            _id: "5b72871c12928e2150a87daf",
            name: "Test lead",
            owner: "5b6ab060f60c0524980fa23c",
            stage: "5b6b123391e0774579ed6701",
            timestamp: "2018-08-14T07:39:08.346Z"
          }
        }
      }

    });
  });

  it("should handle LOAD_STAGES action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_STAGES,
        payload: [
          { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
          { _id: "5b6be3866553a21188441cb1", funnel: "5b6b0fbe91e0774579ed6700", name: "Demo Scheduled", order: 2 },
          { _id: "5b6be3996553a21188441cb2", funnel: "5b6b0fbe91e0774579ed6700", name: "Proposal Made", order: 3 }
        ]
      })
    ).toEqual({
      editLead:{
        lead:{},
      },
      funnels:[],
      leads:[],
      stages: [
        { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
        { _id: "5b6be3866553a21188441cb1", funnel: "5b6b0fbe91e0774579ed6700", name: "Demo Scheduled", order: 2 },
        { _id: "5b6be3996553a21188441cb2", funnel: "5b6b0fbe91e0774579ed6700", name: "Proposal Made", order: 3 }
      ]
    });
  });

  it("should handle LOAD_LEADBOARD action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_LEADBOARD,
        payload: [
          {
            _id: "5b6b0fbe91e0774579ed6700",
            domain: "5b6ab060f60c0524980fa23b",
            name: "renkonazbkafunnel",
            timestamp: "2018-08-08T15:43:58.469Z"
          }
        ]
      })
    ).toEqual({
      editLead:{
        lead:{},
      },
      funnels: [
        {
          _id: "5b6b0fbe91e0774579ed6700",
          domain: "5b6ab060f60c0524980fa23b",
          name: "renkonazbkafunnel",
          timestamp: "2018-08-08T15:43:58.469Z"
        }
      ],
      stages:[],
      leads:[],
    });
  });

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      editLead:{
        lead:{},
      },
      funnels: [],
      stages: [],
      leads: [],
    });
  });

});
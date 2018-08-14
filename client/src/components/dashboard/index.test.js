import React from "react";
import configureStore from "redux-mock-store";
import { loadLeadboardAction, loadStagesAction, loadLeadsAction } from "../../actions/leadActions";
import * as types from "../../actions/types";
import reducer from "../../reducers/leadReducer";

import { shallow } from "enzyme";
import jest from "jest-mock";

import { Provider } from "react-redux";
import ConnectedDashboard from "./Dashboard";
import { Dashboard } from "./Dashboard";
import { loadLeadboard } from "../../actions/leadActions";

let store;
const mockStore = configureStore();

describe("DASHBOARD component", () => {
  let spy;
  const auth = {
    isAuthenticated: true,
    userid: "5b6ab060f60c0524980fa23c",
    domainid: "5b6ab060f60c0524980fa23b"
  };
  const leads = {
    funnels: [ { _id: "5b6b0fbe91e0774579ed6700", name: "renkonazbkafunnel", domain: "5b6ab060f60c0524980fa23b" } ],
    stages: [ { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 } ],
    leads: { _5b6b123391e0774579ed6701: { leads: [ ] } }
  };
  const errors = {};

  it("+++ check if user don't have leads component should render a funnel by invocation createEmptyLeadCards method", () => {
    const wrapper = shallow(<Dashboard loadLeadboard={loadLeadboard(auth.domainid)} auth={auth} leads={leads} errors={errors}/>);
    spy = jest.spyOn(wrapper.instance(), "createEmptyLeadCards");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Actions", () => {
  const initialState = {};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("+++ check leadboards actions on dispatching", () => {
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

  it("+++ render the connected(SMART) component", () => {
    expect(container.find(ConnectedDashboard).length).toEqual(1);
  });
});

describe("LEADBOARD REDUCERS", () => {
  it("+++ should handle LOAD_LEADS action", () => {
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

  it("+++ should handle LOAD_STAGES action", () => {
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
      stages: [
        { _id: "5b6b123391e0774579ed6701", funnel: "5b6b0fbe91e0774579ed6700", name: "Lead In", order: 1 },
        { _id: "5b6be3866553a21188441cb1", funnel: "5b6b0fbe91e0774579ed6700", name: "Demo Scheduled", order: 2 },
        { _id: "5b6be3996553a21188441cb2", funnel: "5b6b0fbe91e0774579ed6700", name: "Proposal Made", order: 3 }
      ]
    });
  });

  it("+++ should handle LOAD_LEADBOARD action", () => {
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
      funnels: [
        {
          _id: "5b6b0fbe91e0774579ed6700",
          domain: "5b6ab060f60c0524980fa23b",
          name: "renkonazbkafunnel",
          timestamp: "2018-08-08T15:43:58.469Z"
        }
      ]
    });
  });

  it("+++ should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      funnels: [],
      stages: [],
      leads: {}
    });
  });

});
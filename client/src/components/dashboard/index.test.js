import React from "react";
import configureStore from "redux-mock-store";
import { loadLeadboard, loadStages, loadLeads } from "../../actions/leadActions";
import * as types from "../../actions/types";
import reducer from "../../reducers/leadReducer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import ConnectedDashboard from "./Dashboard";

let store;
const mockStore = configureStore();

describe("ACTIONS", () => {
  const initialState = {};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("+++ check leadboards actions on dispatching", () => {
    let actions;
    const domainId = "5b6ab060f60c0524980fa23b";
    const funnelId = "5b6b0fbe91e0774579ed6700";
    const stageId = "5b6b123391e0774579ed6701";

    store.dispatch(loadLeadboard(domainId));
    store.dispatch(loadStages(funnelId));
    store.dispatch(loadLeads(stageId));

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
    container = mount(<Provider store={store}><ConnectedDashboard/></Provider>);
  });

  it("+++ render the connected(SMART) component", () => {
    expect(container.find(ConnectedDashboard).length).toEqual(1);
  });

  it("+++ check Prop matches with initialState", () => {
    expect(container.find(ConnectedDashboard).prop("errors")).toEqual(initState.errors);
  });
});

describe("LEADBOARD REDUCERS", () => {
  it("+++ should handle LOAD_LEADS action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_LEADS,
        payload: {
          data: {
            lead: "5b6d44a5f6086b2ee509f1c4"
          }
        }
      })
    ).toEqual({
      funnels: [],
      stages: [],
      leads: {
        leads: {
          data: {
            lead: "5b6d44a5f6086b2ee509f1c4"
          }
        }
      }
    });
  });

  it("+++ should handle LOAD_STAGES action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_STAGES,
        payload: {
          data: {
            stage: "5b6d4c47f6086b2ee509f1c5"
          }
        }
      })
    ).toEqual({
      funnels: [],
      stages: [
        {
          data: {
            stage: "5b6d4c47f6086b2ee509f1c5"
          }
        }
      ],
      leads: {}
    });
  });

  it("+++ should handle LOAD_LEADBOARD action", () => {
    expect(
      reducer({}, {
        type: types.LOAD_LEADBOARD,
        payload: {
          data: {
            funnel: "5b6b0fbe91e0774579ed6700"
          }
        }
      })
    ).toEqual({
      funnels: [
        {
          data: {
            funnel: "5b6b0fbe91e0774579ed6700"
          }
        }
      ],
      stages: [],
      leads: {}
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
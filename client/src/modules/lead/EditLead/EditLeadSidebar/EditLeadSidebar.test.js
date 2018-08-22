import "jsdom-global/register";
import React from "react";
import EditCard from "./EditCard/EditCard";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import EditLeadSidebar from "./EditLeadSidebar";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";



let store;
const mockStore = configureStore();

describe("<EditLeadSidebar/>", () => {
  let editLead = {
        contact: {
      _id: '5b7be33d41e06c0b72930acd',
      name: 'John',
      domain: '5b7a69c07e53b4214177526e',
      organization: {
        _id: '5b7be33d41e06c0b72930acb',
        domain: '5b7a69c07e53b4214177526e',
        name: 'RedDog Inc',
        __v: 0,
        timestamp: '2018-08-21T10:02:37.973Z',
        custom: [
          {
            name: 'Address',
            value: '',
            _id: '5b7be33d41e06c0b72930acc'
          }
        ]
      },
      __v: 0,
      timestamp: '2018-08-21T10:02:37.985Z',
      custom: [
        {
          name: 'Phone',
          value: '',
          _id: '5b7be33d41e06c0b72930acf'
        },
        {
          name: 'Email',
          value: '',
          _id: '5b7be33d41e06c0b72930ace'
        }
      ]
    }
  };

  const initialState = { leads: { editLead: editLead } };

  beforeEach(() => {
    store = mockStore(initialState);
  });


  let wrapper;

  it("render EditLeadSidebar component", () => {
    wrapper = shallow(<EditLeadSidebar store={store} editLead={editLead} />);
    expect(wrapper.exists()).to.equal(true);
  });

  it("render correct EditCard quantity", () => {
    wrapper = mount(<Router><EditLeadSidebar store={store} editLead={editLead} /></Router>);
    wrapper.update();
    expect(wrapper.find("div.container").length).to.equal(2);
  });


});

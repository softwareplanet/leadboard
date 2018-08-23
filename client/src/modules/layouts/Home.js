import React, { Component } from "react";

import Dashboard from "../lead/Dashboard/Dashboard";
import AddLead from "../lead/AddLead/AddLead";

class Home extends Component {
  render() {
    return (
      <div>
        <AddLead />
        <Dashboard />
      </div>
    );
  }
}

export default Home;

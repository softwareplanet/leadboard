import React, { Component } from "react";

import Dashboard from "../lead/Dashboard/Dashboard";
import AddLead from "../lead/AddLead/AddLead";
import Navbar from "./Navbar/Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <AddLead />
        <Dashboard />
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Dashboard from "../lead/Dashboard/Dashboard";
import AddLead from "../lead/AddLead/AddLead";

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

import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import AddLead from "../modal/AddLead";

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

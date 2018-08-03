import React, { Component } from "react";

import Navbar from "./Navbar";
import Dashboard from "../Dashboard";
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

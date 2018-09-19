import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Dashboard from "../lead/Dashboard/Dashboard";
import DashboardActions from "../lead/DashboardActions/DashboardActions";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DashboardActions />
        <Dashboard />
      </div>
    );
  }
}

export default Home;

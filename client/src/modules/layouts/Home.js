import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Dashboard from "../lead/Dashboard/Dashboard";
import DashboardNavbar from "../lead/DashboardNavbar/DashboardNavbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DashboardNavbar />
        <Dashboard />
      </div>
    );
  }
}

export default Home;

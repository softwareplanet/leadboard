import React, { Component } from "react";

import Navbar from "./Navbar";
import Dashboard from "../Dashboard";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    );
  }
}

export default Home;

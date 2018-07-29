import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/home" component={Navbar} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

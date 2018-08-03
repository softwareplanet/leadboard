import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

import Home from "./components/layouts/Home";
import Footer from "./components/layouts/Footer";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

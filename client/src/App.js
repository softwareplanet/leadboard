import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store.js";
import setAuthToken from "./utils/setAuthToken.js";
import setAuthInterceptor from "./utils/setAuthInterceptor.js"
import { loginUserById, logoutUser } from "./modules/auth/authActions";

import PrivateRoute from "./modules/common/PrivateRoute";
import Home from "./modules/layouts/Home";
import Footer from "./modules/layouts/Footer/Footer";
import Login from "./modules/auth/Login/Login";
import Registration from "./modules/auth/Registration/Registration";

import "./App.css";
import { Switch } from "react-router-dom";
import EditLead from "./modules/lead/EditLead/EditLead";

setAuthInterceptor();
// restore redux/storage on page reload
if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;

  if (decoded.exp <= currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    setAuthToken(localStorage.jwtToken);
    store.dispatch(loginUserById(decoded.id));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <PrivateRoute
                exact
                path="/home"
                component={Home}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/lead/:leadId"
                component={EditLead}
              />
            </Switch>
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

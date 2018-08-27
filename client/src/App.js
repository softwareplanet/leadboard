import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store.js";
import setAuthToken from "./utils/setAuthToken.js";
import { loginUserById, setLoginData } from "./modules/auth/authActions";
import PrivateRoute from "./modules/common/PrivateRoute";
import Home from "./modules/layouts/Home";
import Footer from "./modules/layouts/Footer/Footer";
import Login from "./modules/auth/Login/Login";
import Registration from "./modules/auth/Registration/Registration";

import "./App.css";
import { Switch } from "react-router-dom";
import EditLead from "./modules/lead/EditLead/EditLead";
// /home/intern/Documents/leadboard/client/src/modules/lead/EditLead/EditLeadContent/EditLeadTabs/AddActivity/AddActivity.js
import AddActivity from "./modules/lead/EditLead/EditLeadContent/EditLeadTabs/AddActivity/AddActivity";

// restore redux/storage on page reload
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setLoginData(decoded));
  store.dispatch(loginUserById(decoded.id));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //TODO: store.dispatch(logoutUser);
    window.location.href = "/login";
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
            <Route exact path="/" component={store.getState().auth.isAuthenticated ? Home: Login}/>
            <Route exact path="/register" component={store.getState().auth.isAuthenticated ? Home: Registration}/>
            <Route exact path="/test" component={AddActivity}/>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

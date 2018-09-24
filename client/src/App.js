import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store.js";
import setAuthToken from "./utils/setAuthToken.js";
import setAuthInterceptor from "./utils/setAuthInterceptor"
import { loginUserById, logoutUser,setLoginData } from "./modules/auth/authActions";
import PrivateRoute from "./modules/common/PrivateRoute";
import Home from "./modules/layouts/Home";
import Footer from "./modules/layouts/Footer/Footer";
import Login from "./modules/auth/Login/Login";
import Registration from "./modules/auth/Registration/Registration";
import People from "./modules/layouts/Contacts/People/People";
import Organizations from "./modules/layouts/Contacts/Organizations/Organizations";
import styles from "./App.css";

import { Switch } from "react-router-dom";
import EditLead from "./modules/lead/EditLead/EditLead";
import Settings from "./modules/settings/Settings";
import history from "./history";
import Organization from "./modules/detailedView/Organization/Organization";

setAuthInterceptor();
// restore redux/storage on page reload
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;

  if (decoded.exp <= currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch(setLoginData(decoded));
    setAuthToken(localStorage.jwtToken);
    store.dispatch(loginUserById(decoded.id));
  }
}

class App extends Component {
  isUserAuthenticated = () => {
    return store.getState().auth.isAuthenticated;
  };

  redirectHome = () => {
    return <Redirect to={`/pipelines/${store.getState().dashboard.activeFunnel._id}`} />;
    // return history.push(`/pipelines/${match.params.funnelId}`);
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className={styles.app}>
            <Switch>
              <PrivateRoute
                exact
                path="/pipelines/:funnelId"
                component={Home}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/people"
                component={People}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/organizations"
                component={Organizations}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/lead/:leadId"
                component={EditLead}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                path="/settings"
                component={Settings}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                path="/organization/:organizationId"
                component={Organization}
              />
            </Switch>
            <Route exact path="/" render={() => this.isUserAuthenticated() ? this.redirectHome(): <Login />} />
            <Route exact path="/register" render={() => this.isUserAuthenticated() ? this.redirectHome(): <Registration />} />  
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

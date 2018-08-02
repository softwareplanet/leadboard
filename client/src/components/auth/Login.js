import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div id="login-container">
        <div id="login-form">
          <div className="login-form__title">Log in</div>

          <div className="login-form__field">
            <input id="email" name="email" type="text" required />
            <label htmlFor="email">Email</label>
            <div className="login-form__field-error">Please add a valid email address</div>
          </div>

          <div className="login-form__field">
            <input id="password" name="password" type="text" required />
            <label htmlFor="password">Password</label>
            <div className="login-form__field-error">Please add a valid password</div>
          </div>

          <div className="login-form__control">
            <button className="big-button" type="submit">
              Log in
            </button>
            <div>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

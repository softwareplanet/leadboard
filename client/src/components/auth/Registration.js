import React, { Component } from "react";
import { Link } from "react-router-dom";

class Registration extends Component {
  render() {
    return (
      <div id="login-container">
        <div id="login-form">
          <div className="login-form__title">Registration</div>

          <div className="login-form__field">
            <input id="email" name="email" type="text" required />
            <label for="email">Email</label>
            <div className="login-form__field-error">Please add a valid email address</div>
          </div>

          <div className="login-form__control">
            <button className="big-button" type="submit">
              Register an account
            </button>
            <div>
              <Link to="/">I have an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;

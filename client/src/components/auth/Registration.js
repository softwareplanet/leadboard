import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      company: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      company: this.state.company,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);

    axios
      .post("/auth", newUser)
      .then(result => console.log(result.data))
      .catch(error => console.log(error.response.data));
  }

  render() {
    return (
      <div id="login-container">
        <form onSubmit={this.onSubmit}>
          <div id="login-form">
            <div className="login-form__title">Registration</div>
            <div className="login-form__field">
              <input
                id="first_name"
                name="first_name"
                value={this.state.first_name}
                type="text"
                onChange={this.onChange}
              />
              <label htmlFor="first_name">First Name</label>
              <div className="login-form__field-error">Please add a valid first name address</div>
            </div>
            <div className="login-form__field">
              <input
                id="last_name"
                name="last_name"
                value={this.state.last_name}
                type="text"
                onChange={this.onChange}
              />
              <label htmlFor="last_name">Last Name</label>
              <div className="login-form__field-error">Please add a valid last name address</div>
            </div>
            <div className="login-form__field">
              <input id="company" name="company" value={this.state.company} type="text" onChange={this.onChange} />
              <label htmlFor="company">Company Name</label>
              <div className="login-form__field-error">Please add a valid company name</div>
            </div>
            <div className="login-form__field">
              <input id="email" name="email" value={this.state.email} type="text" onChange={this.onChange} />
              <label htmlFor="email">Email</label>
              <div className="login-form__field-error">Please add a valid email address</div>
            </div>
            <div className="login-form__field">
              <input
                id="password"
                name="password"
                value={this.state.password}
                type="password"
                onChange={this.onChange}
              />
              <label htmlFor="password">Password</label>
              <div className="login-form__field-error">Please add a valid password</div>
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
        </form>
      </div>
    );
  }
}

export default Registration;

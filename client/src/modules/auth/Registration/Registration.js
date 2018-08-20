import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../authActions";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      company: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      company: this.state.company,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="login-container">
        <form onSubmit={this.onSubmit}>
          <div id="login-form">
            <div className="login-form__title">Registration</div>
            <div
              className={classname("login-form__field", {
                "login-form__field-red": errors.firstname
              })}
            >
              <input
                id="firstname"
                name="firstname"
                value={this.state.first_name}
                type="text"
                onChange={this.onChange}
              />
              <label htmlFor="firstname">First Name</label>
              {errors.firstname && <div className="login-form__field-error">{errors.firstname}</div>}
            </div>
            <div
              className={classname("login-form__field", {
                "login-form__field-red": errors.lastname
              })}
            >
              <input id="lastname" name="lastname" value={this.state.last_name} type="text" onChange={this.onChange} />
              <label htmlFor="lastname">Last Name</label>
              {errors.lastname && <div className="login-form__field-error">{errors.lastname}</div>}
            </div>
            <div
              className={classname("login-form__field", {
                "login-form__field-red": errors.company
              })}
            >
              <input id="company" name="company" value={this.state.company} type="text" onChange={this.onChange} />
              <label htmlFor="company">Company Name</label>
              {errors.company && <div className="login-form__field-error">{errors.company}</div>}
            </div>
            <div
              className={classname("login-form__field", {
                "login-form__field-red": errors.email
              })}
            >
              <input id="email" name="email" value={this.state.email} type="text" onChange={this.onChange} />
              <label htmlFor="email">Email</label>
              {errors.email && <div className="login-form__field-error">{errors.email}</div>}
            </div>
            <div
              className={classname("login-form__field", {
                "login-form__field-red": errors.password
              })}
            >
              <input
                id="password"
                name="password"
                value={this.state.password}
                type="password"
                onChange={this.onChange}
              />
              <label htmlFor="password">Password</label>
              {errors.password && <div className="login-form__field-error">{errors.password}</div>}
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

registerUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Registration));

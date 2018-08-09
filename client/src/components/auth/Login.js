import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classname from "classnames";
import './Login.css'
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(login, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="login-container">
        <form onSubmit={this.onSubmit}>
          <div id="login-form">
            <div className="login-form__title">Log in</div>
            <form action="">

              <div
                className={classname("group", {
                  "login-form__field-red": errors.email
                })}
              >
                <input type="text" required/>
                <span className="highlight"/>
                <span className="bar"/>
                <label>Email</label>
                {errors.email && <div className="login-form__field-error">{errors.email}</div>}
              </div>


              <div className="group">
                <input type="text" required/>
                <span className="highlight"/>
                <span className="bar"/>
                <label>Password</label>
              </div>
            </form>

            {/*<div*/}
              {/*className={classname("login-form__field", {*/}
                {/*"login-form__field-red": errors.email*/}
              {/*})}*/}
            {/*>*/}
              {/*<input id="email" name="email" value={this.state.email} type="text" onChange={this.onChange} />*/}
              {/*<label htmlFor="email">Email</label>*/}
              {/*{errors.email && <div className="login-form__field-error">{errors.email}</div>}*/}
            {/*</div>*/}

            {/*<div*/}
              {/*className={classname("login-form__field", {*/}
                {/*"login-form__field-red": errors.password*/}
              {/*})}*/}
            {/*>*/}
              {/*<input*/}
                {/*id="password"*/}
                {/*name="password"*/}
                {/*value={this.state.password}*/}
                {/*type="password"*/}
                {/*onChange={this.onChange}*/}
              {/*/>*/}
              {/*<label htmlFor="password">Password</label>*/}
              {/*{errors.password && <div className="login-form__field-error">{errors.password}</div>}*/}
            {/*</div>*/}

            <div className="login-form__control">
              <button className="big-button" type="submit">
                Log in
              </button>
              <div>
                <Link to="/register">Don't have an account?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

loginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

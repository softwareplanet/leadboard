import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import './Login.css'
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import InputGroup from "../common/InputGroup/InputGroup";
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

  componentDidMount() {
    document.title = "Log In";
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
      this.setState({ errors: nextProps.errors });
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
      <div id="Login__container">
        <p className="test">asd</p>
        <form  onSubmit={this.onSubmit}>
          <div id="Login__form">
            <div className="Login__form-title">Log in</div>
            <InputGroup
              className="Login__form-field"
              id="with-placeholder"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              label="Email"
              placeholder="Email"
              error={errors.email}
            />
            <InputGroup
              className="Login__form-field"
              id="with-placeholder"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              label="Password"
              placeholder="Password"
              error={errors.password}
              type={'password'}
            />
            <div className="Login__form-control">
              <button className="Login__form-button big-button" type="submit">
                Log in
              </button>
              <div className="Login__form-registerLink">
                <Link to="/register">
                  <p >Don't have an account?</p>
                </Link>
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

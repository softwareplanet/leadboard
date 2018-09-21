import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Login.css";
import { connect } from "react-redux";
import { loginUser } from "../authActions";
import Spinner from "../../common/Spinner/Spinner";
import InputGroup from "../../common/InputGroup/InputGroup";
import { flow, isEmpty, trim } from "lodash/fp";

const isBlank = flow(trim, isEmpty);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      showErrors: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Leadboard - Log In";
  }

  componentWillUnmount() {
    document.title = "Leadboard";
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  onChange(event) {
    let newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      errors: this.validate(newState)
    });
  }

  validate(login) {
    let errors = {};
    if (isBlank(login.email)) {
      errors.email = "Email cannot be empty";
    }
    if (isBlank(login.password)) {
      errors.password = "Password cannot be empty";
    }
    return errors;
  }

  onSubmit(event) {
    this.setState({ showErrors: true });
    event.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(login);
  }

  render() {

    return this.props.isLoading ? this.renderSpinner() : this.renderLogin();
  }

  renderSpinner = () => (
    <div>
      <div style={{ position: "fixed", top: "50%", left: "50%" }}><Spinner /></div>
    </div>
  )

  renderLogin = () => {
    const { errors } = this.state;

    return (
      <div id="login" className={styles.container}>
        <form className="loginForm" onSubmit={this.onSubmit}>
          <div className={styles.form}>
            <div className={styles.formTitle}>Log in</div>
            <InputGroup
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              label="Email"
              error={this.state.showErrors ? errors.email : ""}
            />
            <InputGroup
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              label="Password"
              error={this.state.showErrors ? errors.password : ""}
              type={"password"}
            />
            <div className={styles.formControl}>
              <button className={styles.formButton} type="submit">
                Log in
              </button>
              <div className={styles.registerLink}>
                <Link to="/register">
                  <p>Don't have an account?</p>
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
  isLoading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.dashboard.loading,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

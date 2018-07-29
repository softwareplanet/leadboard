import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">Copyright &copy; {new Date().getFullYear()} Leadboard by Software Planet Group Ltd.</div>
    );
  }
}

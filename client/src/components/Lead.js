import React, { Component } from "react";

class Lead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard__stage__card">
        <div className="dashboard__stage__card__head">{this.props.lead.name}</div>
        <div className="dashboard__stage__card__subhead">{this.props.lead.company}</div>
      </div>
    );
  }
}

export default Lead;

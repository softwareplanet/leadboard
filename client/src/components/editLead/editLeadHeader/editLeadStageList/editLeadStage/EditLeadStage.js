import React, { Component } from "react";
import "./EditLeadStage.css";

export default class EditLeadStage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let width = {
      width : `${(100/this.props.stages.length)-1}%`
    };
    let oneDay = 24*60*60*1000;
    let stageDate = new Date(this.props.timestamp);
    let now = new Date();

    let diffDays = this.getDays(stageDate, now, oneDay);

    return (
      <li className={!this.props.active ? 'active' : ''} data-toggle="tooltip" data-placement="bottom" title={this.props.name} style={width}>
        {!this.props.active ? diffDays : ''}
      </li>
    );
  }

  getDays(fistDate, secondDate, oneDay){
    return Math.round(Math.abs((secondDate.getTime() - fistDate.getTime())/(oneDay)));
  }
}

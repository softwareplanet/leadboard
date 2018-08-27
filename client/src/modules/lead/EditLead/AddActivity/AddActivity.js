import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import style from "./AddActivity.css";
import phoneIcon from "../../../../assets/add-activity/phone.svg"
import meetingIcon from "../../../../assets/add-activity/meeting.svg"
import taskIcon from "../../../../assets/add-activity/task.svg"
import deadlineIcon from "../../../../assets/add-activity/deadline.svg"
import emailIcon from "../../../../assets/add-activity/email.svg"
import lunchIcon from "../../../../assets/add-activity/lunch.svg"


export default class AddActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "call"
    }
  }

  render() {
        return (
      <form className={style.activityForm}>
        <div className={style.typeButtonsContainer}>
          <ButtonGroup className={style.typeButtons}>
            <button className={style.typeButtonActive}>
              <img className={style.iconImg} src={phoneIcon} alt="phone" />
              Call</button>
            <button className={style.typeButton}>
              <img className={style.iconImg} src={meetingIcon} alt="meeting" />
              Meeting</button>
            <button className={style.typeButton}>Task</button>
            <button className={style.typeButton}>Deadline</button>
            <button className={style.typeButton}>Email</button>
            <button className={style.typeButton}>Lunch</button>
          </ButtonGroup>
        </div>
        <input className={style.typeInput} type="text"/>
        <div className={style.dateInputs}>
          <input className={style.dateInput} type="date"/>
          <input className={style.dateInput} type="text"/>
          <input className={style.dateInput} type="text"/>
        </div>
      </form>
    );
  }
}
import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import style from "./AddActivity.css";
import ButtonWithImg from "./ButtonWithImg";
import phoneIcon from "../../../../assets/add-activity/phone.svg";
import meetingIcon from "../../../../assets/add-activity/meeting.svg";
import taskIcon from "../../../../assets/add-activity/task.svg";
import deadlineIcon from "../../../../assets/add-activity/deadline.svg";
import emailIcon from "../../../../assets/add-activity/email.svg";
import lunchIcon from "../../../../assets/add-activity/lunch.svg";
import deleteIcon from "../../../../assets/add-activity/delete.svg";


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
            <ButtonWithImg
              className={style.typeButton}
              imgClassName={style.iconImg}
              src={taskIcon}
              alt="task">
              Task
            </ButtonWithImg>
            <ButtonWithImg
              className={style.typeButton}
              imgClassName={style.iconImg}
              src={deadlineIcon}
              alt="deadline">
              Deadline
            </ButtonWithImg>
            <ButtonWithImg
              className={style.typeButton}
              imgClassName={style.iconImg}
              src={emailIcon}
              alt="email">
              Email
            </ButtonWithImg>
            <ButtonWithImg
              className={style.typeButton}
              imgClassName={style.iconImg}
              src={lunchIcon}
              alt="lunch">
              Lunch
            </ButtonWithImg>
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
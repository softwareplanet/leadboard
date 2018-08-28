import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import style from "./AddActivity.css";
import ButtonWithImg from "./ButtonWithImg";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import phoneIcon from "../../../../../../assets/add-activity/phone.svg";
import meetingIcon from "../../../../../../assets/add-activity/meeting.svg";
import taskIcon from "../../../../../../assets/add-activity/task.svg";
import deadlineIcon from "../../../../../../assets/add-activity/deadline.svg";
import emailIcon from "../../../../../../assets/add-activity/email.svg";
import lunchIcon from "../../../../../../assets/add-activity/lunch.svg";
import deleteIcon from "../../../../../../assets/add-activity/delete.svg";
import EditLeadEditor from "../EditLeadEditor/EditLeadEditor";
import InputWithButton from "./InputWithButton";


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
          <label>
            <span className={style.dateInputSpan}>DATE</span>
            <DatePicker
              placeholderText={`${moment().format("MM/DD/YYYY")}`}
              className={style.dateInput}
              popperPlacement="bottom"/>
          </label>
          <label>
            <span className={style.dateInputSpan}>TIME</span>
            <DatePicker
            className={style.dateInput}
            popperPlacement="bottom"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time" />
          </label>
          <label>
            <span className={style.dateInputSpan}>DURATION</span>
            <div className={style.inputContainer}>
              <DatePicker
                className={style.dateInput}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={moment().hours(0).minutes(15)}
                maxTime={moment().hours(8).minutes(0)}
                timeFormat="HH:mm"
              />              <button className={style.inputButton}>
                <img className={style.inputImg} src={deleteIcon} alt="del" />
              </button>
            </div>
          </label>
        </div>
        <textarea className={style.note} placeholder="Notes"/>
      </form>
    );
  }
}
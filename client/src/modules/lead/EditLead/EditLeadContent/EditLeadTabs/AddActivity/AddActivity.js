import React, { Component } from "react";
import { ButtonGroup } from 'reactstrap';
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
import ActivityButtons from "./ActivityButtons";

const activityTypes = [
  {type: "Call", icon: phoneIcon},
  {type: "Meeting", icon: meetingIcon},
  {type: "Task", icon: taskIcon},
  {type: "Deadline", icon: deadlineIcon},
  {type: "Email", icon: emailIcon},
  {type: "Lunch", icon: lunchIcon},
  ];

export default class AddActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "Call"
    }
  }

  render() {
        return (
      <form className={style.activityForm}>
        <ActivityButtons
          activeButton={this.state.activeTab}
          buttons={activityTypes}
          groupClassName={style.typeButtons}
          buttonsClassName={style.typeButton}
          activeClassName={style.typeButtonActive}
          imgClassName={style.iconImg}
        />
        <input placeholder={this.state.activeTab} className={style.typeInput} type="text"/>
        <div className={style.dateInputs}>
          <label>
            <span className={style.dateInputSpan}>DATE</span>
            <div className={style.inputContainer}>
              <DatePicker
                placeholderText={`${moment().format("MM/DD/YYYY")}`}
                className={style.dateInput}
                popperPlacement="bottom"/>
              <button className={style.inputButton}>
                <img className={style.inputImg} src={deleteIcon} alt="del" />
              </button>
            </div>
          </label>
          <label>
            <span className={style.dateInputSpan}>TIME</span>
            <div className={style.inputContainer}>
              <DatePicker
                className={style.dateInput}
                popperPlacement="bottom"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time" />
              <button className={style.inputButton}>
                <img className={style.inputImg} src={deleteIcon} alt="del" />
              </button>
            </div>
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
              />
              <button className={style.inputButton}>
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
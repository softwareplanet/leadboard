import React, { Component } from "react";
import style from "./AddActivity.css";
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
import ActivityButtons from "./ActivityButtons";
import isBlank from "../../../../../../utils/isBlank"

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
      activeTab: activityTypes[0].type,
      subject: "",
      date:"",
      time:"",
      duration:"",
    }
  }

  onTypeButtonClick = (event,type) => {
    event.preventDefault();
    this.setState({
        activeTab:type,
        })
  };

  onSubjectChange = event => {
    this.setState({subject:event.target.value})
  };

  onInputPick = (value, field) => {
    this.setState({[field]: value})
  };

  onDeleteClick = (e,field) => {
    e.preventDefault();
    this.setState({[field]:""})
  };



  render() {
    console.log(isBlank(this.state.duration) ? "" : `${this.state.duration.format("HH:mm")}`);
        return (
          <form className={style.activityForm}>
            <div className={style.activityContainer}>
              <ActivityButtons
                onButtonClick={this.onTypeButtonClick}
                activeButton={this.state.activeTab}
                buttons={activityTypes}
                groupClassName={style.typeButtons}
                buttonsClassName={style.typeButton}
                activeClassName={style.typeButtonActive}
                imgClassName={style.iconImg}
              />
              <input
                onChange={this.onSubjectChange}
                className={style.typeInput}
                placeholder={this.state.activeTab}
                value={this.state.subject}
                type="text" />
              <div className={style.dateInputs}>
                <label>
                  <span className={style.dateInputSpan}>DATE</span>
                  <div className={style.inputContainer}>
                    <DatePicker
                      selected={this.state.date}
                      onChange={(date) => this.onInputPick(date, "date")}
                      placeholderText={`${moment().format("MM/DD/YYYY")}`}
                      className={style.dateInput}
                      popperPlacement="bottom" />
                    <button onClick={(e) => this.onDeleteClick(e, "date")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
                <label>
                  <span className={style.dateInputSpan}>TIME</span>
                  <div className={style.inputContainer}>
                    <DatePicker
                      selected={isBlank(this.state.time) ? "" : this.state.time}
                      dateFormat="LT"
                      timeFormat="HH:mm A"
                      onChange={(time) => this.onInputPick(time, "time")}
                      className={style.dateInput}
                      popperPlacement="bottom"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time" />
                    <button onClick={(e) => this.onDeleteClick(e, "time")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
                <label>
                  <span className={style.dateInputSpan}>DURATION</span>
                  <div className={style.inputContainer}>
                    <DatePicker
                      className={style.dateInput}
                      // customInput={<input value={isBlank(this.state.duration) ? "" : `${this.state.duration.format("HH:mm")}`}/>}
                      selected={isBlank(this.state.duration) ? "" : this.state.duration}
                      onChange={(duration) => this.onInputPick(duration, "duration")}
                      dateFormat="LT"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      minTime={moment().hours(0).minutes(15)}
                      maxTime={moment().hours(8).minutes(0)}
                      timeFormat="HH:mm"
                    />
                    <button onClick={(e) => this.onDeleteClick(e, "duration")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <div className={style.footer}>
              <button onClick={this.onCancel} className={style.button}><span>Cancel</span></button>
              <button onClick={this.onSave} className={style.buttonSave}><span>Save</span></button>
            </div>
          </form>
    );
  }
}
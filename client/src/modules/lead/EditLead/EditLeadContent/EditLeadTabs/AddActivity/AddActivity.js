import React, { Component } from "react";
import style from "./AddActivity.css";
import moment from "moment";
import phoneIcon from "../../../../../../assets/add-activity/phone.svg";
import meetingIcon from "../../../../../../assets/add-activity/meeting.svg";
import taskIcon from "../../../../../../assets/add-activity/task.svg";
import deadlineIcon from "../../../../../../assets/add-activity/deadline.svg";
import emailIcon from "../../../../../../assets/add-activity/email.svg";
import lunchIcon from "../../../../../../assets/add-activity/lunch.svg";
import deleteIcon from "../../../../../../assets/add-activity/delete.svg";
import ActivityButtons from "./buttons/ActivityButtons";
import isBlank from "../../../../../../utils/isBlank";
import DatePicker from 'react-pikaday-datepicker';


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

  getActivityDateAndTime = () => {
    let date = this.state.date ? moment(this.state.date) : moment().startOf("day");
    if(!this.state.time) {
      return { date : Date.parse(date._d) };
    }

    let time = moment.duration(this.state.time.diff(moment().startOf("day")));
    date = date.add(Math.floor(time.asMinutes()), "minutes");
    return {
      hasStartTime: true, 
      date : Date.parse(date._d)
    };
  };

  getDuration = () => {
    let duration = {};
    if(this.state.duration) {
      let duration = moment.duration(this.state.duration.diff(moment().startOf("day")));
      return {duration: Math.floor(duration.asMinutes())};
    }
    return duration;
  };

  getActivity = () => {
    return {
      type: this.state.activeTab,
      subject: isBlank(this.state.subject) ? this.state.activeTab : this.state.subject,
      ...this.getDuration(),
      ...this.getActivityDateAndTime()
    }
  };

  getSelectedDate = () => {
    return this.state.date? {selected: this.state.date} : {};
  };

  getSelectedTime = () => {
    return this.state.time? {selected: this.state.time} : {};
  };

  render() {
    let activity = this.getActivity();
        return (
          <div className={style.activityForm}>
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
                autoFocus
                className={style.typeInput}
                placeholder={this.state.activeTab}
                value={this.state.subject}
                type="text" />
              <div className={style.dateInputs}>
                <label>
                  <span className={style.dateInputSpan}>DATE</span>
                  <div className={style.inputContainer}>
                    <DatePicker
                      {...this.getSelectedDate()}
                      onChange={(date) => this.onInputPick(date, "date")}
                      placeholder={`${moment().format("MM/DD/YYYY")}`}
                      showDaysInNextAndPreviousMonths={true}
                      enableSelectionDaysInNextAndPreviousMonths={true}
                      className={style.dateInput} />
                    <button onClick={(e) => this.onDeleteClick(e, "date")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
                <label>
                  <span className={style.dateInputSpan}>TIME</span>
                  <div className={style.inputContainer}>
                    
                    <button onClick={(e) => this.onDeleteClick(e, "time")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
                <label>
                  <span className={style.dateInputSpan}>DURATION</span>
                  <div className={style.inputContainer}>
                    <button onClick={(e) => this.onDeleteClick(e, "duration")} className={style.inputButton}>
                      <img className={style.inputImg} src={deleteIcon} alt="del" />
                    </button>
                  </div>
                </label>
              </div>

            </div>
            <div className={style.footer}>
              <button onClick={this.props.onCancel} className={style.cancelButton}><span>Cancel</span></button>
              <button onClick={() => this.props.onSave(activity)} className={style.buttonSave}><span>Save</span></button>
            </div>
          </div>
    );
  }
}
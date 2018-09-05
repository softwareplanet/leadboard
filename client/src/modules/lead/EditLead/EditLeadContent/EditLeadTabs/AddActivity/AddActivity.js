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
import nextMonthIcon from "../../../../../../assets/add-activity/next-month.svg";
import prevMonthIcon from "../../../../../../assets/add-activity/prev-month.svg";
import ActivityButtons from "./buttons/ActivityButtons";
import isBlank from "../../../../../../utils/isBlank";
import CustomSelect from "./buttons/CustomSelect";
import DatePicker from "react-pikaday-datepicker";
import PropTypes from "prop-types";

const timeIntervalMinutes = 15;
const minutesInHour = 60;
const optionsInHour = minutesInHour / timeIntervalMinutes;
const hoursInDay = 24;
const maxDurationTime = 8;

const activityTypes = [
  { type: "Call", icon: phoneIcon },
  { type: "Meeting", icon: meetingIcon },
  { type: "Task", icon: taskIcon },
  { type: "Deadline", icon: deadlineIcon },
  { type: "Email", icon: emailIcon },
  { type: "Lunch", icon: lunchIcon },
];

export default class AddActivity extends Component {
  state = {
    activeTab: activityTypes[0].type,
    subject: "",
    date: "",
    time: "",
    duration: "",
  };

  onTypeButtonClick = (event, type) => {
    event.preventDefault();
    this.setState({
      activeTab: type,
    });
  };

  onSubjectChange = event => {
    this.setState({ subject: event.target.value });
  };

  onInputPick = (value, field) => {
    this.setState({ [field]: value });
  };

  onDeleteClick = (e, field) => {
    e.preventDefault();
    this.setState({ [field]: "" });
  };

  getActivityDateAndTime = () => {
    let date = this.state.date ? moment(this.state.date) : moment().startOf("day");
    if (!this.state.time) {
      return { date: date._d };
    }

    date = date.add(this.state.time, "minutes");
    return {
      hasStartTime: true,
      date: date._d,
    };
  };

  getDuration = () => {
    let duration = {};
    if (this.state.duration) {
      return { duration: this.state.duration };
    }
    return duration;
  };

  formatDurationValue = () => {
    return `${moment().startOf("day").add(this.state.duration, "minutes").format("HH:mm")}`;
  };

  getActivity = () => {
    let activity = {
      type: this.state.activeTab,
      subject: isBlank(this.state.subject) ? this.state.activeTab : this.state.subject,
      ...this.getDuration(),
      ...this.getActivityDateAndTime(),
    };
    if (this.props.activity) {
      activity._id = this.props.activity._id;
    }
    return activity;
  };

  getSelectedDate = () => {
    return this.state.date ? { value: new Date(this.state.date) } : {};
  };

  getDurationOptions = () => {
    let time = moment().startOf("day").add(timeIntervalMinutes, "minutes");
    let options = [];
    let minutes = timeIntervalMinutes;
    let amountOfDurationOptions = optionsInHour * maxDurationTime;

    for (let i = 0; i < amountOfDurationOptions; i++) {
      options.push({ value: minutes, text: time.format("HH:mm").toString() });
      minutes += timeIntervalMinutes;
      time.add(timeIntervalMinutes, "minutes");
    }
    return options;
  };

  getTimeOptions = () => {
    let time = moment().startOf("day");
    let timeInMinutes = 0;
    let options = [];
    let amountOfTimeOptions = optionsInHour * hoursInDay;
    for (let i = 0; i < amountOfTimeOptions; i++) {
      options.push({ value: timeInMinutes, text: time.format("hh:mm A").toString() });
      time.add(timeIntervalMinutes, "minutes");
      timeInMinutes += timeIntervalMinutes;
    }
    return options;
  };

  componentDidMount = () => {
    if (this.props.activity) {
      let date = moment(this.props.activity.date);
      let dateStart = moment(date.startOf("day")._d);
      let time = moment.duration(moment(date._i).diff(dateStart));
      this.setState({
        ...this.state,
        subject: this.props.activity.subject,
        activeTab: this.props.activity.type,
        date: date,
        time: this.props.activity.hasStartTime ? time: "",
        duration: this.props.activity.duration,
      });
    }
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
            textClassName={style.buttonText}
            buttonsClassName={style.typeButton}
            activeClassName={style.typeButtonActive}
            imgClassName={style.iconImg}
          />
          <input
            onChange={this.onSubjectChange}
            defaultValue={this.props.activity ? this.props.activity.subject : ""}
            autoFocus
            className={style.typeInput}
            placeholder={this.state.activeTab}
            value={this.state.subject}
            type="text"
          />

          <div className={style.dateInputs}>
            <label>
              <span className={style.dateInputSpan}>DATE</span>
              <div className={style.inputContainer}>
                <DatePicker
                  {...this.getSelectedDate()}
                  onChange={(date) => this.onInputPick(date, "date")}
                  format="MM/DD/YYYY"
                  placeholder={`${moment().format("MM/DD/YYYY")}`}
                  showDaysInNextAndPreviousMonths={true}
                  enableSelectionDaysInNextAndPreviousMonths={true}
                  className={style.dateInput} />
                <button onClick={(e) => this.onDeleteClick(e, "date")}
                        className={style.inputButton}>
                  <img className={style.inputImg} src={deleteIcon} alt="del" />
                </button>
              </div>
            </label>
            <label>
              <span className={style.dateInputSpan}>TIME</span>
              <div className={style.inputContainer}>
                <CustomSelect className={style.dateInput}
                              value={isBlank(this.state.time) ? "" : moment().startOf("day").add(this.state.time,"minutes").format("hh:mm A")}
                              options={this.getTimeOptions()}
                              onSelect={time => this.onInputPick(time, "time")} />
                <button onClick={(e) => this.onDeleteClick(e, "time")}
                        className={style.inputButton}>
                  <img className={style.inputImg} src={deleteIcon} alt="del" />
                </button>
              </div>
            </label>
            <label>
              <span className={style.dateInputSpan}>DURATION</span>
              <div className={style.inputContainer}>
                <CustomSelect className={style.dateInput}
                              value={isBlank(this.state.duration) ? "" : this.formatDurationValue()}
                              options={this.getDurationOptions()}
                              onSelect={duration => this.onInputPick(duration, "duration")} />
                <button onClick={(e) => this.onDeleteClick(e, "duration")}
                        className={style.inputButton}>
                  <img className={style.inputImg} src={deleteIcon} alt="del" />
                </button>
              </div>
            </label>
          </div>
        </div>
        <div className={style.footer}>
          <button onClick={this.props.onCancel}
                  className={style.cancelButton}>
            <span>Cancel</span>
          </button>
          <button id="saveActivityButton"
                  onClick={() => this.props.onSave(activity)}
                  className={style.buttonSave}>
            <span>Save</span>
          </button>
        </div>
      </div>
    );
  }
}

AddActivity.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  activity: PropTypes.object,
};

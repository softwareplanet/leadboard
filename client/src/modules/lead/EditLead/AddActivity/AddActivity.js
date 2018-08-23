import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import style from "./AddActivity.css";


export default class AddActivity extends Component {

  render() {
    return (
      <form className={style.activityForm}>
        <div className={style.typeButtons}>
          <ButtonGroup>
            <Button className={style.typeButton}>Call</Button>
            <Button className={style.typeButton}>Meeting</Button>
            <Button className={style.typeButton}>Task</Button>
            <Button className={style.typeButton}>Deadline</Button>
            <Button className={style.typeButton}>Email</Button>
            <Button className={style.typeButton}>Lunch</Button>
          </ButtonGroup>
        </div>
        <input className={style.input} type="text"/>
        <div className="dateInputs">

        </div>
        <label>ASSIGNED TO</label>
        <input type="text"/>
        <div>
          <label>LINKED TO</label>
          <input className={style.input} type="text" placeholder="Deal"/>
          <input className={style.input} type="text" placeholder="People"/>
          <input className={style.input} type="text" placeholder="Organization"/>
        </div>
      </form>
    );
  }
}
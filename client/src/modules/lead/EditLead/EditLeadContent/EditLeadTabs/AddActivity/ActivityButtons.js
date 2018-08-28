import React from "react"
import ButtonWithImg from "./ButtonWithImg";
import { ButtonGroup } from 'reactstrap';
import style from "./ActivityButtons.css";



const activityButtons = (props) => {
  let buttons = props.buttons.map(button => {
    return (
      <ButtonWithImg
        key={button.type}
        className={button.type === props.activeButton?props.activeClassName:props.buttonsClassName}
        onClick={(e) => props.onButtonClick(e,button.type)}
        imgClassName={props.imgClassName}
        src={button.icon}
        alt={`${button.type.toLowerCase()}`}>
        {button.type}
      </ButtonWithImg>
    )
  });

  return(
    <div className={style.tabsContainer}>
      <ButtonGroup className={props.groupClassName}>
        {buttons}
      </ButtonGroup>
    </div>
  )
};

export default activityButtons;
import React from "react"


const inputWithButton = (props) => {


  return(
    <div className={props.className}>
      {props.children}
      <button className={props.buttonClassName}>
        <img src={props.src} alt={props.alt} />
      </button>
    </div>
  )
};
export default inputWithButton;
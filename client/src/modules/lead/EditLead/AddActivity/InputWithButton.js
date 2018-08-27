import React from "react"


const inputWithButton = (props) => {
  let propsCopy = {
    ...props
  };

  delete propsCopy.imgClassName;
  delete propsCopy.src;
  delete propsCopy.alt;
  delete propsCopy.children;

  return(
    <button {...propsCopy}>
      <img className={props.imgClassName} src={props.src} alt={props.alt} />
      {props.children}
    </button>
  )
};
export default inputWithButton;
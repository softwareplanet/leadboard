import React from "react";


const buttonWithImg = (props) => {
  let propsCopy = {
    ...props
  };

  delete propsCopy.textClassName;
  delete propsCopy.imgClassName;
  delete propsCopy.src;
  delete propsCopy.alt;
  delete propsCopy.children;

  return(
    <button {...propsCopy}>
      <img className={props.imgClassName} src={props.src} alt={props.alt} />
      <span className={props.textClassName}>{props.children}</span>
    </button>
  )

};
export default buttonWithImg;

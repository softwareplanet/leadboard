import React from "react";
import style from "./Spinner.css";

const spinner = (props) => {

  return (
    <div className={style.container}>
      <div className={style.spinner}>
        <div className={style.loader}></div>
        <span>L</span>
      </div>
    </div>
  );
};

export default spinner;
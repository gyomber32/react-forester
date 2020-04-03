import React from "react";

import "./Button.css";

interface Props {
  click: any;
}

const Button = (props: Props) => {
  return (
    <button className="button" onClick={props.click}>
      <i className="icon"></i>
    </button>
  );
};

export default Button;

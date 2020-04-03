import React from "react";

import "./Backdrop.css";

interface Props {
  click: any;
}

const backdrop = (props: Props) => (
  <div onClick={props.click} className="backdrop"></div>
);

export default backdrop;

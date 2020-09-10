import React from "react";
import { Button } from "reactstrap";

const Buttons = props => {
  return <Button color={props.color} type={props.type} className={props.className} onClick={props.click}>{props.text}</Button>;
};

export default Buttons;

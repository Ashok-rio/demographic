import React from "react";
import { Input } from "reactstrap";
import "./input.css";

const InputBox = (props,children) => {
  return (
    <Input
      className={"input"}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
    >
        {children}
    </Input>
  );
};

export default InputBox;

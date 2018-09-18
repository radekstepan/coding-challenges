import React from "react";
import cls from "classnames";

const Marker = props => (
  <span className={cls('marker', { mention: props.text[0] === '@' })}>
    {props.text}
  </span>
);

export default Marker;

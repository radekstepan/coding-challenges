import React from "react";

const Field = props => (
  <div>
    <input
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  </div>
);

export default Field;

import React from "react";

const Spinner = props => (
  <img className="spinner" alt="spinner" src={process.env.PUBLIC_URL + '/spinner.svg'} />
);

export default Spinner;

import React from "react";
import { connect } from "react-redux";

const Topbar = props => (
  <div id="topbar">
    <div
      className="logo"
      style={{backgroundImage: `url(${process.env.PUBLIC_URL}/logo.png`}}
      onClick={() => props.navigate('/')}
    />
  </div>
);

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(null, mapDispatch)(Topbar);

import React from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

const ListBooks = props => (
  <div>
    <Topbar />
    <div id="main">
      <div className="wrapper">
        <div className="header">
          <div className="title">Book list</div>
          <input
            type="button"
            className="button"
            value="Add a Book"
            onClick={() => props.navigate('/add')}></input>
        </div>
        <div className="panel">

        </div>
      </div>
    </div>
  </div>
);

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(null, mapDispatch)(ListBooks);

import React from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

const ViewBook = ({ store, dispatch }) => {
  return (
    <div>
      <Topbar />
      <div id="main">
        <div className="wrapper">
          <div className="message warning">Weve sent you a welcome email so go
            check it out.</div>
          <div className="title">Welcome!</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({ store });

export default connect(mapStateToProps)(ViewBook);

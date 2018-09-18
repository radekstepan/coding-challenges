import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "./components/Topbar";
import List from "./components/List";
import Signin from "./components/Signin";

class App extends Component {
  constructor() {
    super();

    this.onSignout = this.onSignout.bind(this);
  }
  
  onSignout() {
    this.props.signout();
  }

  render() {
    const { account, messages } = this.props;

    return (
      <div>
        <Topbar account={account} signout={this.onSignout} />
        {account.username && <List messages={messages} account={account} />}
        {!account.username && <Signin error={account.error} />}
      </div>
    );
  }
}

const mapState = state => state;

const mapDispatch = dispatch => ({
  signout: dispatch.account.signout
});

export default connect(mapState, mapDispatch)(App);
import React, { Component } from "react";
import { connect } from "react-redux";

import history from "./history";
import routes from "./routes";

import Topbar from "./components/Topbar";

class App extends Component {
  componentDidMount() {
    // Watch route changes (allows back-button etc.).
    history.listen(location => this.props.route(location));
  }

  render() {
    return (
      <div>
        <Topbar />
        {this.props.render(this.props.state)}
      </div>
    );
  }
}

const mapState = state => ({
  state,
  render: routes[state.router.route].render
});

const mapDispatch = dispatch => ({
  route: dispatch.router.route
});

export default connect(mapState, mapDispatch)(App);

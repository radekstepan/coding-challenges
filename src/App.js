import { Component } from "react";
import { connect } from "react-redux";

import history from "./history";
import routes from "./routes";

class App extends Component {
  componentDidMount() {
    // Watch route changes (allows back-button etc.).
    history.listen(location => this.props.route(location.pathname));
  }

  // Render the app when the user account is ready.
  render() {
    return this.props.render.call(null);
  }
}

const mapState = state => ({
  render: routes[state.router.route].action
});

const mapDispatch = dispatch => ({
  route: dispatch.router.route
});

export default connect(mapState, mapDispatch)(App);

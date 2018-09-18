import React, { Component } from "react";
import { connect } from "react-redux";

import config from '../data/config';

class Signin extends Component {
  constructor() {
    super();

    this.state = config.auth;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key) {
    return e => this.setState({ [key]: e.target.value });
  }

  onSubmit(e) {
    this.props.signin(this.state);
    e.preventDefault();
  }

  render() {
    const { error } = this.props;

    return (
      <div id="main">
        <div className="modal">
          {error && <div className="message error">Authentication failed.</div>}
          {!error && <div className="message info">You need to sign in first.</div>}
          <div className="title">Sign In</div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.onChange('username')}
              />
            </div>
            <div>
              <input
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.onChange('password')}
              />
            </div>
            <div>
              <input type="submit" className="button" value="Sign In"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  signin: dispatch.account.signin
});

export default connect(null, mapDispatch)(Signin);

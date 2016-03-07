import React from 'react';
import cls from 'classnames';

import Page from '../../lib/PageMixin.js';

import actions from '../../actions/appActions.js';

export default React.createClass({

  displayName: 'LoginPage.jsx',

  mixins: [ Page ],

  _onLogin() {
    actions.emit('user.login', this.state);
  },

  _onInput(key, evt) {
    this.setState({ [`${key}`]: evt.target.value });
  },

  getInitialState() {
    return { 'email': null, 'password': null }
  },

  render() {
    let { app } = this.state;

    console.log(app.user);

    return (
      <div id="form" className={cls({ 'loading': app.system.loading })}>
        <div className="title">login</div>
        <div className="field">
          <div className="label">email</div>
          <input
            type="email"
            className="input"
            autoCorrect="off"
            onChange={this._onInput.bind(this, 'email')}
          />
        </div>
        <div className="field">
          <div className="label">password</div>
          <input
            type="password"
            className="input"
            onChange={this._onInput.bind(this, 'password')}
          />
        </div>
        <button className="button" onClick={this._onLogin}>
          <span>login</span>
        </button>
      </div>
    );
  }

});

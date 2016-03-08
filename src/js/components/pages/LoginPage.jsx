import React from 'react';
import cls from 'classnames';

import Page from '../../lib/PageMixin.js';

import Icon from '../Icon.jsx';

import actions from '../../actions/appActions.js';

import CONST from '../../../constants.json';

export default React.createClass({

  displayName: 'LoginPage.jsx',

  mixins: [ Page ],

  _onProcess() {
    let { app } = this.state;

    // Busy? Noop.
    if (app.system.loading) return;

    // Clear user state?
    if (app.user) {
      actions.emit('user.clear');
    // Login then.
    } else {
      actions.emit('user.login', this.state);
    }
  },

  // Update input in state.
  _onInput(key, evt) {
    this.setState({ [`${key}`]: evt.target.value });
  },

  getInitialState() {
    return { 'email': null, 'password': null };
  },

  render() {
    let { app } = this.state;

    // Default login button.
    let content = 'login';

    // Do we notify about something?
    let notify, ok, fail;
    if (notify = app.system.loading) {
      content = <div><Icon name="spin" />logging you in</div>;
    } else {
      if (notify = !!app.user) {
        if (app.user.error) {
          fail = true;
          content = <div><Icon name="fail" />{app.user.error}</div>;
        } else {
          ok = true;
          content = <div><Icon name="ok" />welcome back!</div>;
        }
      }
    }

    return (
      <div id="form" className={cls({ notify, ok, fail })}>
        <div className="title">login</div>
        <div className="field">
          <div className="label">email</div>
          <input
            ref="email"
            type="email"
            className="input"
            placeholder={CONST.USER.EMAIL}
            autoCorrect="off"
            autoFocus={true}
            onChange={this._onInput.bind(this, 'email')}
          />
        </div>
        <div className="field">
          <div className="label">password</div>
          <input
            type="password"
            className="input"
            placeholder={CONST.USER.PASS}
            onChange={this._onInput.bind(this, 'password')}
          />
        </div>
        <button className="button" onClick={this._onProcess}>
          {content}
        </button>
      </div>
    );
  }

});

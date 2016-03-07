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

  // Focus on email input field.
  componentDidMount() {
    process.nextTick(() => this.refs.email.focus());
  },

  render() {
    let { app } = this.state;

    // Do we notify about something?
    let notify, content, ok, fail;
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
      } else {
        content = <div>login</div>;
      }
    }

    return (
      <div id="form" className={cls({ notify, 'ok': ok, 'fail': fail })}>
        <div className="title">login</div>
        <div className="field">
          <div className="label">email</div>
          <input
            ref="email"
            type="email"
            className="input"
            placeholder={CONST.USER.EMAIL}
            autoCorrect="off"
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

import React from 'react';

import Page from '../../lib/PageMixin.js';

export default React.createClass({

  displayName: 'LoginPage.jsx',

  mixins: [ Page ],

  render() {
    return (
      <div id="form">
        <div className="title">login</div>
        <div className="field">
          <div className="label">email</div>
          <input type="email" className="input" autoCorrect="off" />
        </div>
        <div className="field">
          <div className="label">password</div>
          <input type="password" className="input" />
        </div>
        <button className="button">
          <span>login</span>
        </button>
      </div>
    );
  }

});

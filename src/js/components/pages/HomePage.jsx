import React from 'react';
import _ from 'lodash';

import actions from '../../actions/appActions.js';

import Page from '../../lib/PageMixin.js';

import List from '../List.jsx';

import cache from '../../models/cache.js';

import config from '../../../config.js';

export default React.createClass({

  displayName: 'HomePage.jsx',

  mixins: [ Page ],

  _onSort(sort) {
    // TODO: you can imagine firing an event that would save the sort order and
    //  call the server for the data given this new query.
    actions.emit('products.load', { sort });
  },

  render() {
    let { app } = this.state;

    // No list to display?
    let content, log;
    if (!app.query) {
      content = <div id="loading">Loading &hellip;</div>
    } else {
      content = <List {...app} />;
      log = <div className="log">Showing {app.query.count} items with {cache.length} in cache</div>;
    }

    return (
      <div>
        <div id="header">
          <div className="wrap">
            {log}
            <div className="logo" />
            <div className="title">product list</div>
          </div>
          <div className="thead">
            <div className="td" onClick={this._onSort.bind(this, 'product')}>Product</div>
            <div className="td" onClick={this._onSort.bind(this, 'brand')}>Brand</div>
            <div className="td" onClick={this._onSort.bind(this, 'color')}>Color</div>
            <div className="td" onClick={this._onSort.bind(this, 'material')}>Material</div>
            <div className="td" onClick={this._onSort.bind(this, 'price')}>Price</div>
          </div>
        </div>
        {content}
      </div>
    );
  }

});

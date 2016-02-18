import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import cls from 'classnames';

import actions from '../../actions/appActions.js';

import Page from '../../lib/PageMixin.js';

import List from '../List.jsx';
import Icon from '../Icon.jsx';

import cache from '../../models/cache.js';

import config from '../../../config.js';

export default React.createClass({

  displayName: 'ProductsPage.jsx',

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
      log = <div className="log">Showing {numeral(app.query.count).format('(0a)')} items with {cache.length} in cache</div>;
    }

    // Loading icon.
    let icon = <Icon name="spin" className={cls({ 'active': app.system.loading })} />;

    let field = (key) => {
      return (
        <div key={key} className="td" onClick={this._onSort.bind(this, key)}>{key}</div>
      );
    };

    return (
      <div>
        <div id="header">
          <div className="wrap">
            {icon}
            {log}
            <div className="logo" />
            <div className="title">product list</div>
          </div>
          <div className="thead">
            {field('product')}
            {field('brand')}
            {field('color')}
            {field('material')}
            {field('price')}
          </div>
        </div>
        {content}
      </div>
    );
  }

});

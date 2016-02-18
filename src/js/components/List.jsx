import React from 'react';
import _ from 'lodash';
import cls from 'classnames';
import numeral from 'numeral';

import actions from '../actions/appActions.js';

import cache from '../models/cache.js';

export default React.createClass({

  displayName: 'List.jsx',

  _onScroll() {
    actions.emit('evt.scroll', this.refs.el.scrollTop);
  },

  render() {
    let props = this.props;

    // Number of items offset at the top.
    let a = Math.floor(props.window.offset / props.window.item);
    // Number of items below fold.
    let b = Math.max(0, props.query.count - a - props.window.count);

    // Single item height.
    let h = props.window.item;

    let ids = [];

    let items = _.map(_.range(Math.min(props.window.count, props.query.count - a)), (i) => {
      // Generate the item id.
      let id = `${props.query.queryId}-${a + i}`;

      let field = (key, format) => {
        return (
          <div
            key={key}
            title={item[key]}
            className={cls('td', { 'active': props.query.params && props.query.params.sort == key, [`${key}`]: true })}
          >
            {format ? numeral(item[key]).format(format) : item[key]}
          </div>
        );
      };

      // In the cache?
      let content;
      let item;
      if (item = cache.get(id)) {
        content = (
          <div className="wrap">
            {field('product')}
            {field('brand')}
            {field('color')}
            {field('material')}
            {field('price', '$0,0[.]00')}
          </div>
        );
      // Load it then.
      } else {
        ids.push(id);
        content = <div className="loading">&hellip;</div>;
      }

      return (
        <div
          key={id}
          className="item"
          style={{ 'height': `${h}px`, 'lineHeight': `${h - 1}px` }}
        >{content}</div>
      );
    });

    // Fetch all collated missing products.
    process.nextTick(() => actions.emit('products.get', ids));

    return (
      <div id="list" style={{ 'height': props.window.height }} onScroll={this._onScroll} ref="el">
        <div style={{ 'height': `${a * h}px` }} />
        <div>{items}</div>
        <div style={{ 'height': `${b * h}px` }} />
      </div>
    );
  }

});

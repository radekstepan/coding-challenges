import React from 'react';
import _ from 'lodash';
import cls from 'classnames';

import actions from '../actions/appActions.js';

import cache from '../models/cache.js';

export default React.createClass({

  displayName: 'List.jsx',

  _onScroll() {
    let offset = Math.floor(this.refs.el.scrollTop / this.props.window.item);

    this.setState({ 'offset': offset });
  },

  getInitialState() {
    return { 'offset': 0 };
  },

  render() {
    let props = this.props;

    // Number of items offset at the top.
    let a = this.state.offset;
    // Number of items below fold.
    let b = props.query.count - a - props.window.count;

    // Single item height.
    let h = props.window.item;

    let ids = [];

    let items = _.map(_.range(props.window.count), (i) => {
      // Generate the item id.
      let id = `${props.query.queryId}-${a + i}`;

      let field = (key) => {
        return (
          <div
            key={key}
            title={item[key]}
            className={cls('td', { 'active': props.query.params && props.query.params.sort == key })}
          >
            {item[key]}
          </div>
        );
      };

      // In the cache?
      let content;
      let item;
      if (item = cache.get(id)) {
        content = (
          <div className="wrap">
            {field('name')}
            {field('brand')}
            {field('color')}
            {field('material')}
            {field('price')}
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
          style={{ 'height': `${h}px`, 'lineHeight': `${h-1}px` }}
        >{content}</div>
      );
    });

    // Fetch all collated missing products.
    process.nextTick(() => actions.emit('products.get', ids));

    return (
      <div id="list" style={{ 'height': props.window.height }} onScroll={this._onScroll} ref="el">
        <div style={{ 'height': a * h }} />
        <div>{items}</div>
        <div style={{ 'height': b * h }} />
      </div>
    );
  }

});

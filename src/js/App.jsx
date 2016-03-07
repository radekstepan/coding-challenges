import React from 'react';
import { RouterMixin, navigate } from 'react-mini-router';
import _ from 'lodash';

import HomePage from './components/pages/HomePage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';

import actions from './actions/appActions.js';

import appStore from './stores/appStore.js';

// Will fire even if event is prevented from propagating.
delete RouterMixin.handleClick;

// Values are function names below.
let routes = {
  '/': 'home'
};

let blank = false;

// Build a link to a page.
let find = ({ to, params, query }) => {
  let $url;
  let re = /:[^\/]+/g;

  // Skip empty objects.
  [ params, query ] = [ _.isObject(params) ? params : {}, query ].map(o => _.pick(o, _.identity));

  // Find among the routes.
  _.find(routes, (name, url) => {
    if (name != to) return;
    let matches = url.match(re);

    // Do not match on the number of params.
    if (_.keys(params).length != (matches || []).length) return;

    // Do not match on the name of params.
    if (!_.every(matches, m => m.slice(1) in params)) return;

    // Fill in the params.
    $url = url.replace(re, m => params[m.slice(1)]);

    // Found it.
    return true;
  });

  if (!$url) throw new Error(`path ${to} ${JSON.stringify(params)} is not recognized`);

  // Append querystring.
  if (_.keys(query).length) {
    $url += "?" + _.map(query, (v, k) => `${k}=${v}`).join("&");
  }

  return $url;
};

export default React.createClass({

  displayName: 'App.jsx',

  mixins: [ RouterMixin ],

  routes: routes,

  statics: {
    // Build a link to a page.
    link: (route) => find(route),
    // Route to a link.
    navigate: (route) => {
      let fn = _.isString(route) ? _.identity : find;
      navigate(fn(route));
    }
  },

  // Index.
  home() {
    process.nextTick(() => actions.emit('xhr'));
    return <HomePage />;
  },

  // 404.
  notFound(path) {
    return <NotFoundPage path={path} />;
  },

  // Use blank <div /> to always re-mount a Page.
  render() {
    if (blank) {
      process.nextTick(() => this.setState({ tick: true }));
      blank = false;
      return <div />;
    } else {
      blank = true;
      return this.renderCurrentRoute();
    }
  }

});

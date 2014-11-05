Backbone = require 'backbone'

repos = require './repos.coffee'

module.exports = state = new Backbone.Model

  'ready': no
  'message': null

repos.on 'sync', ->
  state.set 'ready', yes
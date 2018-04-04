Backbone = require 'backbone'

repos = require './repos.coffee'

module.exports = state = new Backbone.Model

  # Have we loaded repos already?
  'ready': no
  # Any errors?
  'error': null
  # Which language is selected.
  'selected': null # = All

# We are ready when repos have synced.
repos.on 'sync', ->
  state.set 'ready', yes

repos.on 'error', (col, err) ->
  state.set
    'ready': yes
    'error': do err.toString
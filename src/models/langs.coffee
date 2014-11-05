Backbone = require 'backbone'

repos = require './repos.coffee'

class Lang extends Backbone.Model

module.exports = new Backbone.Collection

  'model': Lang

  # Sort by name.
  sortBy: (lang) ->
    console.log lang

# Save a lang when adding to repos.
repos.on 'add', ->
  console.log 'adding', arguments
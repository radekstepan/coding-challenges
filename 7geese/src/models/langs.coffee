Backbone = require 'backbone'

repos = require './repos.coffee'

class Lang extends Backbone.Model

class Langs extends Backbone.Collection

  'model': Lang

  # Sort by name.
  'comparator': 'name'

module.exports = langs = new Langs()

# Save a lang when adding to repos. See `test/repos.coffee`.
repos.on 'add', (model) ->
  return unless name = model.get 'language'
  langs.add { name } unless langs.findWhere { name }
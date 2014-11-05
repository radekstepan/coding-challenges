Backbone = require 'backbone'

config = require './config.coffee'

class Repo extends Backbone.Model

class Repos extends Backbone.Collection

  'model': Repo

  'url': "https://api.github.com/#{config.owner}/repos"

  # Sort by name.
  sortBy: (repo) ->
    console.log repo

  # Be able to filter on `lang` attribute.

module.exports = new Repos()
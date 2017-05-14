Backbone = require 'backbone'

# Override xhr handler.
Backbone.ajax = require '../modules/request.coffee'

class Repo extends Backbone.Model

class Repos extends Backbone.Collection

  'model': Repo

  # See https://developer.github.com/v3/repos
  'url': 'https://api.github.com/orgs/7Geese/repos'

module.exports = new Repos()
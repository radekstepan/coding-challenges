Ractive  = require 'ractive'
Backbone = require 'backbone'

require 'ractive-transitions-fade'
require 'ractive-adaptors-backbone'
require 'ractive-ractive'

Repos = require './views/repos.coffee'

config = require './models/config.coffee'
repos  = require './models/repos.coffee'
routes = require './modules/routes.coffee'

Backbone.ajax = require './modules/request.coffee'

new Ractive
  
  'template': config.layout

  'el': 'body'

  'components': { Repos }

  onrender: ->
    do repos.fetch

    new Backbone.Router routes
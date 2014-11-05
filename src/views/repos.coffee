Ractive = require 'ractive'

state     = require '../models/state.coffee'
repos     = require '../models/repos.coffee'
{ human } = require '../utils/string.coffee'

module.exports = Ractive.extend

  'template': require '../templates/repos.html'

  'data': { state, repos, human }

  'adapt': [ 'Backbone' ]
Ractive = require 'ractive'

Icons = require './icons.coffee'

state  = require '../models/state.coffee'
repos  = require '../models/repos.coffee'
langs  = require '../models/langs.coffee'
format = require '../utils/string.coffee'

# Renders collection of repos and their filter.
module.exports = Ractive.extend

  'template': require '../templates/repos.html'

  'data': {
    state, repos, langs, format,
    # Is this language selected?
    show: (lang) ->
      return yes unless $lang = @get 'state.selected'
      $lang is lang
  }

  'components': { Icons }

  # We use repos and langs Backbone Collections.
  'adapt': [ 'Backbone' ]

  # Change the selected language from filter.
  onrender: ->
    @on 'select', (ctx, name=null) ->
      @set 'state.selected', name
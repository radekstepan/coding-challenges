Ractive  = require 'ractive'
Backbone = require 'backbone'

# Load Ractive plugins.
require 'ractive-transitions-slide'
require 'ractive-adaptors-backbone'
require 'ractive-ractive'

# Component for rendering the actual repos.
Repos = require './views/repos.coffee'

# A collection of repos.
repos = require './models/repos.coffee'

new Ractive
  
  'template': require './templates/layout.html'

  'el': 'body'

  'components': { Repos }

  onrender: ->
    # Fetch the repos when ready.
    do repos.fetch
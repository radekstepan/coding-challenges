Ractive = require 'ractive'

# Fontello icon hex codes.
codes =
  'fork': '\e801'
  'star': '\e802'

module.exports = Ractive.extend

  'template': require '../templates/icons.html'

  onrender: ->
    @observe 'icon', (icon) ->
      if icon and hex = codes[icon]
        @set 'code', parseInt hex, 16
      else
        @set 'code', null
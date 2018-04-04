Ractive = require 'ractive'

# Fontello icon hex codes.
codes =
  'forks':   '\e800'
  'stars':   '\e801'
  'spinner': '\e802'
  'sadness': '\e803'

# Renders icons by name.
module.exports = Ractive.extend

  'template': require '../templates/icons.html'

  onrender: ->
    @observe 'icon', (icon) ->
      if icon and hex = codes[icon]
        @set 'code', parseInt hex, 16
      else
        @set 'code', null
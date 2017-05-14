_ = require 'underscore'

module.exports =

  # Numanize a repo name. See `test/string.coffee`.
  numan: (text) ->
    text
    .replace(/(^|-)(?!on|as)\d*([a-z])/ig, _.partial(_.result, _, 'toUpperCase'))
    .replace(/-/g, ' ')
_ = require 'underscore'

module.exports =

  human: (text) ->
    cap = -> p.replace /^(?!on|as)\d*([a-z]{1})/, (l) -> do l.toUpperCase
    ( cap p for p in text.split('-') ).join ' '
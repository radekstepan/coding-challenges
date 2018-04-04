assert = require 'assert'

format = require '../src/utils/string.coffee'

module.exports =

  'string - numan readable formatting': (done) ->

    formatted = ( format.numan(text) for text in [
      '7geese-recognition-board'
      'hubot-on-dotcloud'
      'django-db-utils'
      'sg-tpie'
      'django-view-as'
    ] )

    assert.deepEqual formatted, [
      '7Geese Recognition Board'
      'Hubot on Dotcloud'
      'Django Db Utils'
      'Sg Tpie'
      'Django View as'
    ]

    do done
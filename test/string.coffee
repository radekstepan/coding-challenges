assert = require 'assert'

{ human } = require '../src/utils/string.coffee'

module.exports =

  'string - human readable formatting': (done) ->

    formatted = ( human(text) for text in [
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
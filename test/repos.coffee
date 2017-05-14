assert = require 'assert'

repos = require '../src/models/repos.coffee'
langs = require '../src/models/langs.coffee'

module.exports =

  'repos - langs inited empty': (done) ->
    assert.equal langs.length, 0
    do done

  'repos - add lang when adding repos': (done) ->
    repos.add { 'name': 'Rails', 'language': 'Ruby' }
    repos.add { 'name': 'Django', 'language': 'Python' }
    repos.add { 'name': 'Sinatra', 'language': 'Ruby' }

    assert.deepEqual langs.pluck('name'), [ 'Python', 'Ruby' ]

    do done
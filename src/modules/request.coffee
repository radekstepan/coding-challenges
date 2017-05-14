xhr = require 'xhr'

# A tiny xhr module adding correct headers.
module.exports = (req) ->
  xhr
    'uri': req.url
    'headers':
      'Content-Type': 'application/json'
      'Accept': 'application/vnd.github.v3'
  , (err, resp, body) ->
    return req.error err if err
    req.success JSON.parse body
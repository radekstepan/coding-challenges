# Field Chat Code Test

A message history inspector for a group messaging service.

![Screencap](raw/master/apps/field-chat/screencap.gif)

## Quickstart

```bash
$ nvm use # optional
$ npm i
$ npm start # http://localhost:3000
```

## Features
- User auth.
- Listing of messages from Firestore.
- Client-side search of messages.
- Message text decorating.

## Architecture
React/Rematch (Redux) app bootstrapped using `create-react-app` with Sass
styles.


## Postmortem
- Project was delivered over-schedule at 8hrs.
- The "desc" query order doesn't complete in time, thus I am using "asc", the default.
- Requests to AWS need to be proxied from localhost.
- Message search has been implemented on the client-side, since Firestore doesn't have any full-text search capability built-in.
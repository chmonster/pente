// src/server.js
const { Server, Origins } = require('boardgame.io/server')
const { Pente } = require('./Game')

const server = Server({
  games: [Pente],
  origins: [Origins.LOCALHOST],
})
1
server.run(8000, () => console.log('Pente server running on localhost:8000...'))

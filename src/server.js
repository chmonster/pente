// src/server.js
const { Server, Origins, FlatFile } = require('boardgame.io/server')
const { Pente } = require('./Game')

const server = Server({
  games: [Pente],
  origins: [Origins.LOCALHOST],
  db: new FlatFile({
    dir: '../storage',
    logging: false,
    // ttl: (optional, see node-persist docs),
  }),
})

server.router.get('/0', (ctx, next) => {})

server.router.get('/1', (ctx, next) => {})

server.run(8000, () => console.log('Pente server running on localhost:8000...'))

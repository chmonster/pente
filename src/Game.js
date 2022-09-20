import { INVALID_MOVE } from 'boardgame.io/core'

export const rows = 12
export const columns = 12
const lineLength = 5

const idxy = (x, y) => columns * y + x
const coords = id => [id % columns, Math.floor(id / columns)]

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const addV = (a, b) => a.map((e, i) => e + b[i])
const mulV = (c, a) => a.map(e => e * c)

const relLoc = (id, c, dir) => idxy(...addV(coords(id), mulV(c, dir)))

const otherPlayer = ctx => ctx.playOrder.filter(a => a !== ctx.currentPlayer)[0]

const capturePosition = (G, ctx, id, dir) => {
  if (G.cells[relLoc(id, 3, dir)] === ctx.currentPlayer) {
    if (
      G.cells[relLoc(id, 2, dir)] === otherPlayer(ctx) &&
      G.cells[relLoc(id, 1, dir)] === otherPlayer(ctx)
    ) {
      return true
    }
    return false
  }
}

const checkCapture = (G, ctx, id) => {
  let dir
  for (let i = 0; i < directions.length; i++) {
    dir = directions[i]
    if (capturePosition(G, ctx, id, dir)) {
      console.log('capture')
      G.cells[relLoc(id, 2, dir)] = null
      G.cells[relLoc(id, 1, dir)] = null
      return true
    }
  }
  return false
}

const cellVictory = (rows, columns, lineLength) => {
  let cellIndex = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let line = []
      for (let i = 0; i < lineLength; i++) {
        if (y + i < rows) line.push(idxy(x, y + i))
      }
      if (line.length === lineLength) cellIndex.push(line)
      line = []
      for (let i = 0; i < lineLength; i++) {
        if (x + i < columns) line.push(idxy(x + i, y))
      }
      if (line.length === lineLength) cellIndex.push(line)
      line = []
      for (let i = 0; i < lineLength; i++) {
        if (x + i < columns && y + i < rows) line.push(idxy(x + i, y + i))
      }
      if (line.length === lineLength) cellIndex.push(line)
      line = []
      for (let i = 0; i < lineLength; i++) {
        if (x > 0 && y + i < rows) line.push(idxy(x - i, y + i))
      }
      if (line.length === lineLength) cellIndex.push(line)
    }
  }

  return cellIndex
}

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = cellVictory(rows, columns, lineLength)
  const isRowComplete = row => {
    const symbols = row.map(i => cells[i])
    return symbols.every(i => i !== null && i === symbols[0])
  }
  return positions.map(isRowComplete).some(i => i === true)
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0
}

export const Isolation = {
  setup: () => ({
    cells: Array(rows * columns).fill(null),
    score: {
      0: 0,
      1: 0,
    },
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE
      }
      G.cells[id] = ctx.currentPlayer
      //ninuki-renju capture move

      if (checkCapture(G, ctx, id)) {
        G.score[ctx.currentPlayer] = G.score[ctx.currentPlayer] + 2
      }
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells) || G.score[ctx.currentPlayer] === 10) {
      return { winner: ctx.currentPlayer }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },
}

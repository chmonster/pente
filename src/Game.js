import { INVALID_MOVE } from 'boardgame.io/core'

export const rows = 4
export const columns = 6
const lineLength = 3

const cellVictory = (rows, columns, lineLength) => {
  let cellIndex = []
  const id = (x, y) => columns * y + x

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let line = []
      for (let i = 0; i < lineLength; i++) {
        if (y + i < rows) line.push(id(x, y + i))
      }
      if (line.length === lineLength) cellIndex.push(line)
      line = []
      for (let i = 0; i < lineLength; i++) {
        if (x + i < columns) line.push(id(x + i, y))
      }
      if (line.length === lineLength) cellIndex.push(line)
      line = []
      for (let i = 0; i < lineLength; i++) {
        if (x + i < columns && y + i < rows) line.push(id(x + i, y + i))
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
  setup: () => ({ cells: Array(rows * columns).fill(null) }),

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
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },
}

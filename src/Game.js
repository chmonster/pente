import { INVALID_MOVE } from 'boardgame.io/core'
import {
  rows,
  columns,
  lineLength,
  captureLength,
  stoneVictory,
  colIdx,
  rowIdx,
  llIdx,
  capIdx,
  idxy,
  directions,
  relLoc,
} from './helper'

const otherPlayer = ctx => ctx.playOrder.filter(a => a !== ctx.currentPlayer)[0]

const capturePosition = (G, ctx, id, dir) => {
  return (
    G.cells[relLoc(id, captureLength + 1, dir)] === ctx.currentPlayer &&
    capIdx.every(i => G.cells[relLoc(id, i, dir)] === otherPlayer(ctx))
  )
}

const checkCapture = (G, ctx, id) => {
  return (
    directions
      .map(dir => {
        if (capturePosition(G, ctx, id, dir)) {
          capIdx.forEach(i => (G.cells[relLoc(id, i, dir)] = null))
          return true
        } else return false
      })
      .filter(x => x).length * captureLength
  )
}

const cellVictory = () => {
  return rowIdx
    .map(y => {
      return colIdx.map(x => {
        return [
          //vertical
          llIdx.reduce((a, i) => {
            if (y + i <= rows) {
              return a.concat(idxy(x, y + i))
            } else {
              return a
            }
          }, []),
          //horizontal
          llIdx.reduce((a, i) => {
            if (x + i <= columns) {
              return a.concat(idxy(x + i, y))
            } else {
              return a
            }
          }, []),
          //backslash
          llIdx.reduce((a, i) => {
            if (x + i <= columns && y + i <= rows) {
              return a.concat(idxy(x + i, y + i))
            } else {
              return a
            }
          }, []),
          //forward slash
          llIdx.reduce((a, i) => {
            if (x - i >= 0 && y + i <= rows) {
              return a.concat(idxy(x - i, y + i))
            } else {
              return a
            }
          }, []),
        ]
      })
    })
    .flat([2])
    .filter(line => line.length === lineLength)
}

// Return true if `cells` is in a winning configuration.
function IsLineVictory(cells) {
  const positions = cellVictory()
  // console.log(positions)
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

export const Pente = {
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
      const captures = checkCapture(G, ctx, id)
      if (captures > 0) {
        G.score[ctx.currentPlayer] = G.score[ctx.currentPlayer] + captures
      }
    },
  },

  endIf: (G, ctx) => {
    if (IsLineVictory(G.cells) || G.score[ctx.currentPlayer] === stoneVictory) {
      return { winner: ctx.currentPlayer }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      return G.cells.flatMap((cell, i) => {
        return cell === null ? { move: 'clickCell', args: [i] } : []
      })
    },
  },
}

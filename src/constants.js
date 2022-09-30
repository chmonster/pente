export const rows = 4
export const columns = 4
export const lineLength = 4
export const captureLength = 0
export const stoneVictory = 10

export const whiteStone = '\u25CB'
export const blackStone = '\u25CF'
export const dot = '\u00B7'

export const colIdx = [...Array(columns).keys()].map(i => i + 1)
export const rowIdx = [...Array(rows).keys()].map(i => i + 1)
export const llIdx = [...Array(lineLength).keys()]
export const capIdx = [...Array(captureLength).keys()].map(i => i + 1)

export const idxy = (x, y) => columns * (y - 1) + (x - 1)
export const coords = id => [(id % columns) + 1, Math.floor(id / columns) + 1]

export const cellSize = a => (a * (100 / (rows + 2))).toString().concat('vmin')

export const directions = [
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

export const relLoc = (id, c, dir) => idxy(...addV(coords(id), mulV(c, dir)))

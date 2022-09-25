export const rows = 7
export const columns = 10
export const lineLength = 5
export const captureLength = 2
export const stoneVictory = 10

export const colIdx = [...Array(columns).keys()].map(i => i + 1)
export const rowIdx = [...Array(rows).keys()].map(i => i + 1)
export const llIdx = [...Array(lineLength).keys()]
export const capIdx = [...Array(captureLength).keys()].map(i => i + 1)

export const idxy = (x, y) => columns * (y - 1) + (x - 1)
export const coords = id => [(id % columns) + 1, Math.floor(id / columns) + 1]

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

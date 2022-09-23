export const rows = 10
export const columns = 10
export const lineLength = 5
export const captureLength = 2

export const colIdx = [...Array(columns).keys()]
export const rowIdx = [...Array(rows).keys()]
export const llIdx = [...Array(lineLength).keys()]
export const capIdx = [...Array(captureLength).keys()].map(i => i + 1)
// console.log(capIdx)

export const idxy = (x, y) => columns * y + x
export const coords = id => [id % columns, Math.floor(id / columns)]

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

import { coords, cellSize, columns, rows } from './constants'
import React from 'react'

const cellStyle = id => {
  const [x, y] = coords(id)
  return {
    height: cellSize(1),
    width: cellSize(1),
    gridColumnStart: x,
    gridRowStart: y,
    fontSize: cellSize(0.5),
    placeItems: 'center',
  }
}

const Cell = ({ cells, id, onClick, currentPlayer, gameover }) => {
  const [isHovering, setHovering] = React.useState(false)

  const cellx = cells[id] ? `cell${cells[id]}` : `cell${currentPlayer}`

  const cellHover = cells[id]
    ? `cell-done ${cellx}`
    : !gameover && isHovering
    ? `cell-available ${cellx}`
    : ''

  const cellVertEdge = id => {
    const x = coords(id)[0]
    switch (x) {
      case 1:
        return 'border-left-edge'
      case columns:
        return 'border-right-edge'
      default:
        return ''
    }
  }

  const cellHorzEdge = id => {
    const y = coords(id)[1]
    switch (y) {
      case 1:
        return 'border-top-edge'
      case rows:
        return 'border-bottom-edge'
      default:
        return ''
    }
  }

  const cellClass = `cell ${cellHover} ${cellVertEdge(id)} ${cellHorzEdge(id)}`

  return (
    <div
      style={cellStyle(id)}
      key={id}
      id={id}
      className={cellClass}
      onClick={!gameover && !cells[id] ? () => onClick(id) : null}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    ></div>
  )
}

export default Cell

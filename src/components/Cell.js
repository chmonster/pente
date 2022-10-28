import { coords, cellSize, columns, rows } from '../game/constants'
import { useState } from 'react'

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

const Cell = ({
  cells,
  id,
  onClick,
  currentPlayer,
  viewingPlayer,
  gameover,
}) => {
  const [isHovering, setHovering] = useState(false)

  const cellx = cells[id] ? `cell${cells[id]}` : `cell${currentPlayer}`
  const playerIsActive =
    !gameover && viewingPlayer && currentPlayer === viewingPlayer

  const cellHover = cells[id]
    ? `cell-done ${cellx}`
    : playerIsActive && isHovering
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

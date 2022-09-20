import React, { useReducer } from 'react'
import { rows, columns } from './Game'

export function IsolationBoard({ ctx, G, moves }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const onClick = id => {
    moves.clickCell(id)
    forceUpdate()
  }

  let banner = ''
  if (ctx.gameover) {
    banner =
      ctx.gameover.winner !== undefined ? (
        <div id='winner'>Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id='winner'>Draw!</div>
      )
  } else {
    banner = `
    ${ctx.currentPlayer} to play
    Captures: 
    0: ${G.score['0']} 
    1: ${G.score['1']}
    `
  }

  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'crosshair',
  }

  const cellStyleDone = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'notallowed',
  }

  //const columns = 6
  //const rows = 4
  const idxy = (x, y) => columns * y + x

  let tbody = []
  for (let y = 0; y < rows; y++) {
    let cells = []
    for (let x = 0; x < columns; x++) {
      const id = idxy(x, y)
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyleDone}>{G.cells[id]}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>
      )
    }
    tbody.push(<tr key={`row${y}`}>{cells}</tr>)
  }

  return (
    <div>
      <header>{banner}</header>

      <table id='board'>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  )
}

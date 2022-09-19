import React from 'react'

export function IsolationBoard({ ctx, G, moves }) {
  const onClick = id => moves.clickCell(id)

  let winner = ''
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id='winner'>Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id='winner'>Draw!</div>
      )
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

  const columns = 6
  const rows = 4
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
      <table id='board'>
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  )
}

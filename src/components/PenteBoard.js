import React from 'react'
import StatusBar from './StatusBar'
import Cell from './Cell'
import {
  rowIdx,
  colIdx,
  rows,
  columns,
  idxy,
  cellSize,
} from '../game/constants'
import { useParams } from 'react-router-dom'

const boardStyle = {
  width: cellSize(columns),
  height: cellSize(rows),
  display: 'grid',
  columnGap: 0,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  padding: 0,
}

const GridCells = ({ onClick, G, ctx }) => {
  const { playerID } = useParams()
  console.log('GridCells', playerID)
  return (
    <div id='board' style={boardStyle}>
      {rowIdx.map(y => {
        return colIdx.map(x => (
          <Cell
            key={idxy(x, y)}
            cells={G.cells}
            id={idxy(x, y)}
            currentPlayer={ctx.currentPlayer}
            viewingPlayer={playerID}
            gameover={ctx.gameover}
            onClick={onClick}
          />
        ))
      })}
    </div>
  )
}

const PenteBoard = ({ ctx, G, moves }) => {
  const onClick = id => {
    moves.clickCell(id)
  }

  return (
    <>
      <StatusBar G={G} ctx={ctx} />
      <GridCells onClick={onClick} G={G} ctx={ctx} />
    </>
  )
}
export default PenteBoard

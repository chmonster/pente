import React from 'react'
import { rowIdx, colIdx, rows, columns, idxy, coords } from './helper'
import { Row, Col, Container } from 'react-bootstrap'

const Banner = ({ G, ctx }) => {
  const showWinner = ctx.gameover && ctx.gameover.winner !== undefined
  const showTie = ctx.gameover && ctx.gameover.winner === undefined
  const showTurn = !ctx.gameover

  return (
    <>
      <Container fluid as='header' style={{ height: cellSize(1) }}>
        {showWinner && (
          <Row id='winner'>
            <Col>Winner: {ctx.gameover.winner}</Col>
          </Row>
        )}
        {showTie && (
          <Row id='winner'>
            <Col>Draw!</Col>
          </Row>
        )}
        {showTurn && (
          <Row id='report'>
            <Col id='cap0'>0: {G.score['0']} captures</Col>
            <Col id='toplay'>{ctx.currentPlayer} to play</Col>
            <Col id='cap1'>1: {G.score['1']} captures</Col>
          </Row>
        )}
      </Container>
    </>
  )
}

const cellSize = a => (a * (100 / (rows + 1))).toString().concat('vmin')

const boardStyle = {
  width: cellSize(columns),
  height: cellSize(rows),
  justifySelf: 'center',
  display: 'grid',
  columnGap: 0,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
}

const GridCells = ({ onClick, G, ctx }) => (
  <Container fluid id='board' style={boardStyle}>
    {rowIdx.map(y => {
      return colIdx.map(x => (
        <Cell
          key={idxy(x, y)}
          cells={G.cells}
          id={idxy(x, y)}
          currentPlayer={ctx.currentPlayer}
          onClick={onClick}
        />
      ))
    })}
  </Container>
)

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

const Cell = ({ cells, id, onClick, currentPlayer }) => {
  const [isHovering, setHovering] = React.useState(false)

  const cellx = cells[id]
    ? ' cell'.concat(cells[id])
    : ' cell'.concat(currentPlayer)

  const cellClass = 'cell'.concat(
    cells[id] ? ' cell-done'.concat(cellx) : isHovering ? cellx : ''
  )

  return (
    <div
      style={cellStyle(id)}
      key={id}
      id={id}
      className={cellClass}
      onClick={!cells[id] ? () => onClick(id) : null}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {cells[id] || id}
    </div>
  )
}

export function PenteBoard({ ctx, G, moves }) {
  const onClick = id => {
    moves.clickCell(id)
  }

  return (
    <>
      <Banner G={G} ctx={ctx} />
      <GridCells onClick={onClick} G={G} ctx={ctx} />
    </>
  )
}

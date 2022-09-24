import React from 'react'
import { rowIdx, colIdx, rows, columns, idxy, coords } from './helper'
import { Row, Col, Container } from 'react-bootstrap'

// const cellSize = (100 / rows + 1).toString().concat('vmin')
const fontSize = (0.5 * (100 / rows + 1)).toString().concat('vmin')

const cellStyle = id => {
  const [x, y] = coords(id)
  return {
    // height: cellSize,
    // width: cellSize,
    'grid-column-start': x,
    'grid-row-start': y,
    fontSize: fontSize,
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
      className={cellClass}
      onClick={!cells[id] ? () => onClick(id) : null}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {cells[id] || '?'}
    </div>
  )
}

const Banner = ({ G, ctx }) => {
  const showWinner = ctx.gameover && ctx.gameover.winner !== undefined
  const showTie = ctx.gameover && ctx.gameover.winner === undefined
  const showTurn = !ctx.gameover

  return (
    <>
      <Container
        fluid
        as='header'
        // style={{ height: cellSize, fontSize: fontSize }}
      >
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

const boardStyle = {
  display: 'grid',
  'column-gap': 0,
  'grid-template-columns': 'repeat(' + columns + ', 1fr)',
  'grid-template-rows': 'repeat(' + rows + ', 1fr)',
}

const GridCells = ({ onClick, G, ctx }) => (
  <div id='board' style={boardStyle}>
    {rowIdx.map(y => (
      <div class='gridRow' key={`r${y}`}>
        {colIdx.map(x => (
          <Cell
            key={idxy(x, y)}
            cells={G.cells}
            id={idxy(x, y)}
            currentPlayer={ctx.currentPlayer}
            onClick={onClick}
          />
        ))}
      </div>
    ))}
  </div>
)

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

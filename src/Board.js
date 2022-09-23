import React from 'react'
import { rowIdx, colIdx, rows, idxy } from './helper'
import { Row, Col, Container } from 'react-bootstrap'

const cellSize = (100 / rows + 1).toString().concat('vmin')
const fontSize = (0.5 * (100 / rows + 1)).toString().concat('vmin')
const cellSizeStyle = {
  height: cellSize,
  width: cellSize,
  fontSize: fontSize,
}

const Cell = ({ cells, id, onClick, currentPlayer }) => {
  const [isHovering, setHovering] = React.useState(false)

  const cellx = cells[id]
    ? ' cell'.concat(cells[id])
    : ' cell'.concat(currentPlayer)

  const cellClass =
    'cell d-flex align-items-center justify-content-center'.concat(
      cells[id] ? ' cell-done'.concat(cellx) : isHovering ? cellx : ''
    )

  return (
    <Col
      style={cellSizeStyle}
      key={id}
      className={cellClass}
      onClick={!cells[id] ? () => onClick(id) : null}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {cells[id] || ''}
    </Col>
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
        style={{ height: cellSize, position: 'fixed', fontSize: fontSize }}
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
          <Row id='report' className='align-items-center'>
            <Col id='cap0' className='border'>
              0: {G.score['0']} captures
            </Col>
            <Col id='toplay'>{ctx.currentPlayer} to play</Col>
            <Col id='cap1'>1: {G.score['1']} captures</Col>
          </Row>
        )}
      </Container>
    </>
  )
}

const GridCells = ({ onClick, G, ctx }) => (
  <div id='board' style={{ position: 'absolute', top: cellSize }}>
    <Container>
      {rowIdx.map(y => (
        <Row key={`r${y}`}>
          {colIdx.map(x => (
            <Cell
              key={idxy(x, y)}
              cells={G.cells}
              id={idxy(x, y)}
              currentPlayer={ctx.currentPlayer}
              onClick={onClick}
            />
          ))}
        </Row>
      ))}
    </Container>
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

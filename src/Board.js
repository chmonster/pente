import React from 'react'
import {
  rowIdx,
  colIdx,
  rows,
  columns,
  idxy,
  coords,
  stoneVictory,
} from './helper'
import { Row, Col, Container } from 'react-bootstrap'

const whiteStone = '\u25CB'
const blackStone = '\u25CF'
const dot = '\u00B7'

const Banner = ({ G, ctx }) => {
  const showWinner = ctx.gameover && ctx.gameover.winner !== undefined
  const showTie = ctx.gameover && ctx.gameover.winner === undefined
  const showTurn = !ctx.gameover

  return (
    <>
      <Container fluid as='header' style={{ height: cellSize(1) }}>
        {showWinner && (
          <Row id='winner'>
            <Col>
              Winner: {ctx.gameover.winner === '0' ? whiteStone : blackStone}
            </Col>
          </Row>
        )}
        {showTie && (
          <Row id='winner'>
            <Col>Draw!</Col>
          </Row>
        )}
        {showTurn && (
          <Row id='report'>
            <Col id='cap0'>
              {whiteStone}: {blackStone.repeat(G.score['0'])}
              {dot.repeat(stoneVictory - G.score['0'])}
              {dot.repeat()}
            </Col>
            <Col id='toplay'>
              {ctx.currentPlayer === '1' ? blackStone : whiteStone} to play
            </Col>
            <Col id='cap1'>
              {blackStone}: {whiteStone.repeat(G.score['1'])}
              {dot.repeat(stoneVictory - G.score['1'])}
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

const cellSize = a => (a * (100 / (columns + 1))).toString().concat('vmin')

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
  <div id='board' style={boardStyle}>
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
  </div>
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
    ? 'cell'.concat(cells[id])
    : 'cell'.concat(currentPlayer)

  const cellHover = cells[id]
    ? 'cell-done '.concat(cellx)
    : isHovering
    ? cellx
    : ''

  const cellVertEdge = id => {
    const x = coords(id)[0]
    console.log('column', x)
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
    console.log('row', y)
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
      onClick={!cells[id] ? () => onClick(id) : null}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {/* {cells[id] || `x${coords(id)[0]}y${coords(id)[1]}`} */}
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

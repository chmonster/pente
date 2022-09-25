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

const cellSize = a => (a * (100 / (rows + 2))).toString().concat('vmin')

const Banner = ({ G, ctx }) => {
  const showWinner = ctx.gameover && ctx.gameover.winner !== undefined
  const showTie = ctx.gameover && ctx.gameover.winner === undefined
  const showTurn = !ctx.gameover

  return (
    <>
      <Container fluid as='header'>
        {showWinner && (
          <Row
            id='winner'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
            <Col>
              Winner: {ctx.gameover.winner === '0' ? whiteStone : blackStone}
            </Col>
          </Row>
        )}
        {showTie && (
          <Row
            id='winner'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
            <Col className='winnerText'>Draw!</Col>
          </Row>
        )}
        {showTurn && (
          <Row
            id='report'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
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

const boardStyle = {
  width: cellSize(columns),
  height: cellSize(rows),
  display: 'grid',
  columnGap: 0,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  padding: 0,
}

const GridCells = ({ onClick, G, ctx }) => (
  <Container id='board' style={boardStyle}>
    {rowIdx.map(y => {
      return colIdx.map(x => (
        <Cell
          key={idxy(x, y)}
          cells={G.cells}
          id={idxy(x, y)}
          currentPlayer={ctx.currentPlayer}
          gameover={ctx.gameover}
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

export function PenteBoard({ ctx, G, moves }) {
  const onClick = id => {
    moves.clickCell(id)
  }

  return (
    <div style={{ justifyItems: 'center' }}>
      <Banner G={G} ctx={ctx} />
      <GridCells onClick={onClick} G={G} ctx={ctx} />
    </div>
  )
}

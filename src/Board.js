import React from 'react'
import { rowIdx, colIdx, columns, idxy } from './Game'
import { Row, Col, Container } from 'react-bootstrap'

const cellSize = Math.floor(100 / columns)
const cellSizeStyle = {
  height: cellSize.toString().concat('vh'),
  width: cellSize.toString().concat('vw'),
  fontSize: (0.5 * cellSize).toString().concat('vw'),
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

export function PenteBoard({ ctx, G, moves }) {
  const onClick = id => {
    moves.clickCell(id)
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

  const tbody = (
    <>
      <Container fluid>
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
    </>
  )

  return (
    <>
      <header className='jumbotron'>{banner}</header>
      {tbody}
    </>
  )
}
